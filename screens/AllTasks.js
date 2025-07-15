import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Cards from "../components/Cards";
import InputData from "../components/InputData";
import Loader from "../components/Loader";

import { loadTasks } from "../utils/storage";
import { setTasks } from "../store/tasksSlice";

const AllTasksScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [inputVisible, setInputVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const fetchTasks = async () => {
      const localTasks = await loadTasks();
      dispatch(setTasks(localTasks));
    };

    fetchTasks();
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length === 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [tasks]);

  return (
    <View style={styles.container}>
      {!tasks ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
          <Ionicons name="notifications-off-outline" size={60} color="#9ca3af" />
          <Text style={styles.emptyText}>No tasks or reminders</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setInputVisible(true)}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <>
          <Cards
            home={true}
            data={tasks}
            setInputVisible={setInputVisible}
            setUpdatedData={setUpdatedData}
          />
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setInputVisible(true)}
          >
            <Ionicons name="add" size={32} color="#fff" />
          </TouchableOpacity>
        </>
      )}

      <InputData
        visible={inputVisible}
        setVisible={setInputVisible}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </View>
  );
};

export default AllTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    position: "relative",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3b82f6",
    borderRadius: 30,
    padding: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 16,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
