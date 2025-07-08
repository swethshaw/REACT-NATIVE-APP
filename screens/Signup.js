import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API } from "../config";

const SignupScreen = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace("Home");
    }
  }, [isLoggedIn]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { username, email, password } = form;

    if (!username.trim() || !email.trim() || !password) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Validation Error", "Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post(API.SIGNUP, form);

      if (response.status === 200) {
        setForm({ username: "", email: "", password: "" });
        Alert.alert("Success", "Sign-up successful!");
        navigation.replace("Login");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.request
          ? "Network error: Unable to connect to the server."
          : "Sign-up failed, please try again.");
      Alert.alert("Error", message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Sign Up</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={form.username}
          onChangeText={(text) => handleChange("username", text)}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#111827",
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#374151",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#8b5cf6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#d1d5db",
    textAlign: "center",
  },
});
