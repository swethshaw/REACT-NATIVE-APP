import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Cards from "../components/Home/Cards";
import Loader from "../components/Home/Loader";
import { API } from "../config";

const CompletedTasksScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const token = await AsyncStorage.getItem("token");

        if (id && token) {
          const headers = {
            id: id,
            authorization: `Bearer ${token}`,
          };

          const response = await axios.get(API.GET_COMPLETED_TASKS, { headers });
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch completed tasks:", error);
        Alert.alert("Error", "Failed to load completed tasks");
      }
    };

    fetchCompletedTasks();
  }, []);

  if (!data) {
    return (
      <View style={styles.centered}>
        <Loader />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noTaskText}>No Completed Task</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Cards home={false} data={data} />
    </ScrollView>
  );
};

export default CompletedTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  noTaskText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6b7280",
  },
});
