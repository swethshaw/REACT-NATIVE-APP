import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import { useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask } from "../store/tasksSlice";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const InputData = ({ visible, setVisible, updatedData, setUpdatedData }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    desc: "",
    important: false,
    alarmTime: null,
    notificationId: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [enableDate, setEnableDate] = useState(false);
  const [enableTime, setEnableTime] = useState(false);

  useEffect(() => {
    if (updatedData?.id) {
      setForm({
        title: updatedData.title || "",
        desc: updatedData.desc || "",
        important: updatedData.important ?? false,
        alarmTime: updatedData.alarmTime || null,
        notificationId: updatedData.notificationId || null,
      });

      if (updatedData.alarmTime) {
        const alarmDate = new Date(updatedData.alarmTime);
        setEnableDate(true);
        setEnableTime(
          alarmDate.getHours() !== 0 || alarmDate.getMinutes() !== 0
        );
      }
    } else {
      setForm({
        title: "",
        desc: "",
        important: false,
        alarmTime: null,
        notificationId: null,
      });
    }
  }, [updatedData]);

  const resetForm = () => {
    setVisible(false);
    setForm({
      title: "",
      desc: "",
      important: false,
      alarmTime: null,
      notificationId: null,
    });
    setEnableDate(false);
    setEnableTime(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
    setUpdatedData({});
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === "set" && selectedDate) {
      const updated = new Date(form.alarmTime || new Date());
      updated.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      setForm((prev) => ({ ...prev, alarmTime: updated }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (event.type === "set" && selectedTime) {
      const updated = new Date(form.alarmTime || new Date());
      updated.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setForm((prev) => ({ ...prev, alarmTime: updated }));
    }
  };

  const scheduleNotification = async (title, alarmTime) => {
    if (!alarmTime) return null;
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Reminder",
        body: `Reminder to complete: ${title}`,
      },
      trigger: { type: "date", date: alarmTime },
    });
    return id;
  };

  const cancelNotification = async (id) => {
    if (id) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.desc) {
      Alert.alert("Validation Error", "Title and description are required.");
      return;
    }

    let alarmTime = null;
    if (enableDate || enableTime) {
      const now = new Date();
      const base = form.alarmTime ? new Date(form.alarmTime) : now;
      const date = enableDate ? base : now;
      const time = enableTime ? base : now;
      alarmTime = new Date(
        date.setHours(time.getHours(), time.getMinutes(), 0, 0)
      );
    }

    if (updatedData?.notificationId) {
      await cancelNotification(updatedData.notificationId);
    }

    const notificationId = alarmTime
      ? await scheduleNotification(form.title, alarmTime)
      : null;

    const taskPayload = {
      ...form,
      alarmTime: alarmTime ? alarmTime.toISOString() : null,
      notificationId,
    };

    if (updatedData?.id) {
      dispatch(updateTask({ id: updatedData.id, ...taskPayload }));
    } else {
      dispatch(addTask({ id: uuid.v4(), completed: false, ...taskPayload }));
    }

    resetForm();
  };

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (updatedData?.notificationId) {
            await cancelNotification(updatedData.notificationId);
          }
          dispatch(deleteTask(updatedData.id));
          resetForm();
        },
      },
    ]);
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={resetForm}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#ccc"
              value={form.title}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, title: text }))
              }
            />

            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Description"
              placeholderTextColor="#ccc"
              value={form.desc}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, desc: text }))
              }
              multiline
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Mark as Important</Text>
              <Switch
                value={form.important}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, important: value }))
                }
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Set Date</Text>
              <Switch
                value={enableDate}
                onValueChange={(val) => {
                  setEnableDate(val);
                  if (val) {
                    setShowDatePicker(true);
                  } else if (!val && !enableTime) {
                    setForm((prev) => ({ ...prev, alarmTime: null }));
                  }
                }}
              />
            </View>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={form.alarmTime ? new Date(form.alarmTime) : new Date()}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Set Time</Text>
              <Switch
                value={enableTime}
                onValueChange={(val) => {
                  setEnableTime(val);
                  if (val) {
                    setShowTimePicker(true);
                  } else if (!val && !enableDate) {
                    setForm((prev) => ({ ...prev, alarmTime: null }));
                  }
                }}
              />
            </View>

            {showTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={form.alarmTime ? new Date(form.alarmTime) : new Date()}
                onChange={handleTimeChange}
                is24Hour={false}
              />
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>
                {updatedData?.id ? "Update" : "Submit"}
              </Text>
            </TouchableOpacity>

            {updatedData?.id && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteText}>Delete Task</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InputData;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(31, 41, 55, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#374151",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  switchLabel: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
