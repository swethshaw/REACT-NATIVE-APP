import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

  useEffect(() => {
    const fetchTasks = async () => {
      const localTasks = await loadTasks();
      dispatch(setTasks(localTasks));
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {!tasks ? (
        <Loader />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Cards
              home={true}
              data={tasks}
              setInputVisible={setInputVisible}
              setUpdatedData={setUpdatedData}
            />
          </ScrollView>

          {/* Floating Add Button */}
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
    // marginTop: 25,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
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
});
