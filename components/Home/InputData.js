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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { API } from "../../config";

const InputData = ({ visible, setVisible, updatedData, setUpdatedData }) => {
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

  const submitData = async () => {
    if (!form.title || !form.desc) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");

      await axios.post(API.CREATE_TASK, form, {
        headers: {
          id,
          authorization: `Bearer ${token}`,
        },
      });

      resetForm();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Task creation failed.");
    }
  };

  const updateTask = async () => {
    if (!form.title || !form.desc) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");

      await axios.put(`${API.UPDATE_TASK}/${updatedData.id}`, form, {
        headers: {
          id,
          authorization: `Bearer ${token}`,
        },
      });

      resetForm();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Update failed.");
    }
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

          <TouchableOpacity
            style={styles.submitButton}
            onPress={updatedData?.id ? updateTask : submitData}
          >
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
