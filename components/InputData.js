import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";

import { addTask, updateTask } from "../store/tasksSlice";

const InputData = ({ visible, setVisible, updatedData, setUpdatedData }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", desc: "" });

  useEffect(() => {
    if (updatedData?.id) {
      setForm({
        title: updatedData.title || "",
        desc: updatedData.desc || "",
      });
    } else {
      setForm({ title: "", desc: "" });
    }
  }, [updatedData]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const resetForm = () => {
    setVisible(false);
    setForm({ title: "", desc: "" });
    setUpdatedData({ id: "", title: "", desc: "" });
  };

  const handleSubmit = () => {
    if (!form.title || !form.desc) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    if (updatedData?.id) {
      dispatch(updateTask({ id: updatedData.id, ...form }));
    } else {
      dispatch(
        addTask({
          id: uuid.v4(),
          title: form.title,
          desc: form.desc,
          completed: false,
          important: false,
        })
      );
    }

    resetForm();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={resetForm}
    >
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
            onChangeText={(text) => handleChange("title", text)}
          />

          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Description"
            placeholderTextColor="#ccc"
            value={form.desc}
            onChangeText={(text) => handleChange("desc", text)}
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>
              {updatedData?.id ? "Update" : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  submitButton: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
