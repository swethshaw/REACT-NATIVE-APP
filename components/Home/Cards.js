import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { API } from "../../config";

const Cards = ({ home, setInputVisible, data, setUpdatedData }) => {
  const handleCompleteTask = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("id");

      await axios.put(
        `${API.UPDATE_COMPLETE_TASK}/${id}`,
        {},
        {
          headers: {
            id: userId,
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("id");

      const response = await axios.put(
        `${API.UPDATE_IMPORTANT_TASK}/${id}`,
        {},
        {
          headers: {
            id: userId,
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputVisible(true);
    setUpdatedData({ id, title, desc });
  };

  const deleteTask = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("id");

      const response = await axios.delete(`${API.DELETE_TASK}/${id}`, {
        headers: {
          id: userId,
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {data &&
        data.map((item, i) => (
          <View style={styles.card} key={i}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  { backgroundColor: item.complete ? "#047857" : "#f87171" },
                ]}
                onPress={() => handleCompleteTask(item._id)}
              >
                <Text style={styles.statusText}>
                  {item.complete ? "Completed" : "Incomplete"}
                </Text>
              </TouchableOpacity>

              <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => handleImportant(item._id)}>
                  {item.important ? (
                    <FontAwesome name="heart" size={24} color="#ef4444" />
                  ) : (
                    <FontAwesome name="heart-o" size={24} color="#d1d5db" />
                  )}
                </TouchableOpacity>

                {home !== "false" && (
                  <TouchableOpacity
                    onPress={() =>
                      handleUpdate(item._id, item.title, item.desc)
                    }
                  >
                    <FontAwesome name="edit" size={22} color="#d1d5db" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => deleteTask(item._id)}>
                  <MaterialIcons name="delete" size={24} color="#d1d5db" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

      {home === "true" && (
        <TouchableOpacity
          style={styles.addCard}
          onPress={() => setInputVisible(true)}
        >
          <Ionicons name="add-circle-sharp" size={48} color="#d1d5db" />
          <Text style={styles.addText}>Add Task</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  grid: {
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  desc: {
    color: "#d1d5db",
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1,
    marginRight: 8,
  },
  statusText: {
    color: "#fff",
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  addCard: {
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "#d1d5db",
    fontSize: 18,
    marginTop: 8,
  },
});
