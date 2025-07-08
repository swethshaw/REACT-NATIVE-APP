import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import { API } from "../config";
const LoginScreen = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace("Home");
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    const { username, password } = form;

    if (!username || !password) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    try {
      const response = await axios.post(API.LOGIN, form);
      await AsyncStorage.setItem("id", response.data.id);
      await AsyncStorage.setItem("token", response.data.token);

      setForm({ username: "", password: "" });
      dispatch(authActions.login());
      navigation.replace("Home");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={form.username}
        onChangeText={(text) => setForm({ ...form, username: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
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
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  link: {
    color: "#d1d5db",
    marginTop: 10,
    textAlign: "center",
  },
});
