import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "../components/Home/Loader";
import Cards from "../components/Home/Cards";
import { API } from "../config";

const IncompleteTasksScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchIncompleteTasks = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const token = await AsyncStorage.getItem("token");

        if (id && token) {
          const headers = {
            id,
            authorization: `Bearer ${token}`,
          };

          const response = await axios.get(API.GET_INCOMPLETE_TASKS, {
            headers,
          });

          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching incomplete tasks:", error);
        Alert.alert("Error", "Could not load incomplete tasks.");
      }
    };

    fetchIncompleteTasks();
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
        <Text style={styles.noTaskText}>No Incomplete Task</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Cards home={false} data={data} />
    </ScrollView>
  );
};

export default IncompleteTasksScreen;

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
