import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import Cards from "../components/Cards";
import Loader from "../components/Loader";

const CompletedTasksScreen = () => {
  const tasks = useSelector((state) => state.tasks);
  const completedTasks = tasks?.filter((task) => task.completed);

  if (!tasks) {
    return (
      <View style={styles.centered}>
        <Loader />
      </View>
    );
  }

  if (completedTasks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noTaskText}>No Completed Task</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Cards home={false} data={completedTasks} />
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
