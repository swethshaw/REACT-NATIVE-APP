import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Cards from "../components/Home/Cards";
import InputData from "../components/Home/InputData";
import Loader from "../components/Home/Loader";
import { API } from "../config";

const AllTasksScreen = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const token = await AsyncStorage.getItem("token");

        if (id && token) {
          const headers = {
            id: id,
            authorization: `Bearer ${token}`,
          };

          const response = await axios.get(API.GET_ALL_TASKS, { headers });
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        Alert.alert("Error", "Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      {!data ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={() => setInputVisible(true)}>
              <Ionicons name="add-circle-sharp" size={40} color="#ccc" />
            </TouchableOpacity>
          </View>

          <Cards
            home={true}
            data={data.tasks}
            setInputVisible={setInputVisible}
            setUpdatedData={setUpdatedData}
          />
        </ScrollView>
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
    paddingHorizontal: 10,
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
});
