import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import InputData from "../components/InputData";
import Cards from "../components/Cards";
import Loader from "../components/Loader";
import { clearCompletedTasks } from "../store/tasksSlice";

const CompletedTasksScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const completedTasks = tasks?.filter((task) => task.completed);
  const [inputVisible, setInputVisible] = React.useState(false);
  const [updatedData, setUpdatedData] = React.useState({
    id: "",
    title: "",
    desc: "",
  });
  const handleClearAll = () => {
    Alert.alert(
      "Clear All Completed Tasks",
      "Are you sure you want to delete all completed tasks?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(clearCompletedTasks()),
          style: "destructive",
        },
      ]
    );
  };

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Cards
          home={false}
          data={completedTasks}
          setInputVisible={setInputVisible}
          setUpdatedData={setUpdatedData}
        />
      </ScrollView>

      <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
      <InputData
        visible={inputVisible}
        setVisible={setInputVisible}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </View>
  );
};

export default CompletedTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    // paddingTop: 10,
    // paddingHorizontal: 10,
    position: "relative",
  },
  scrollContent: {
    paddingBottom: 80,
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
  clearButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
