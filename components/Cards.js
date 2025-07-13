import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import {
  deleteTask,
  toggleComplete,
  toggleImportant,
} from "../store/tasksSlice";

const Cards = ({ home, setInputVisible, data, setUpdatedData }) => {
  const dispatch = useDispatch();

  const handleUpdate = (id, title, desc) => {
    setInputVisible(true);
    setUpdatedData({ id, title, desc });
  };

  return (
    <View style={styles.container}>
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
                    { backgroundColor: item.completed ? "#047857" : "#f87171" },
                  ]}
                  onPress={() => dispatch(toggleComplete(item.id))}
                >
                  <Text style={styles.statusText}>
                    {item.completed ? "Completed" : "Incomplete"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => dispatch(toggleImportant(item.id))}>
                    {item.important ? (
                      <FontAwesome name="heart" size={20} color="#ef4444" />
                    ) : (
                      <FontAwesome name="heart-o" size={20} color="#d1d5db" />
                    )}
                  </TouchableOpacity>

                  {home !== "false" && (
                    <TouchableOpacity
                      onPress={() => handleUpdate(item.id, item.title, item.desc)}
                    >
                      <FontAwesome name="edit" size={20} color="#d1d5db" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity onPress={() => dispatch(deleteTask(item.id))}>
                    <MaterialIcons name="delete" size={22} color="#d1d5db" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>

      {home === "true" && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setInputVisible(true)}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Cards;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginTop: 18,
  },
  grid: {
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 100,
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
    fontSize: 14,
    color: "#d1d5db",
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statusButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 8,
  },
  statusText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
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
