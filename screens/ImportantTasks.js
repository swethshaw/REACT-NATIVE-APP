import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import InputData from "../components/InputData";
import Loader from "../components/Loader";
import Cards from "../components/Cards";

const ImportantTasksScreen = () => {
  const tasks = useSelector((state) => state.tasks);
  const importantTasks = tasks?.filter((task) => task.important);
  const [inputVisible, setInputVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  if (!tasks) {
    return (
      <View style={styles.centered}>
        <Loader />
      </View>
    );
  }

  if (importantTasks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noTaskText}>No Important Task</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Cards
          home={false}
          data={importantTasks}
          setInputVisible={setInputVisible}
          setUpdatedData={setUpdatedData}
        />

      <InputData
        visible={inputVisible}
        setVisible={setInputVisible}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </View>
  );
};

export default ImportantTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
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
