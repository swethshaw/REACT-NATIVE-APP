import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { toggleComplete } from "../store/tasksSlice";

const Cards = ({ home, setInputVisible, data, setUpdatedData }) => {
  const dispatch = useDispatch();
  const [expandedId, setExpandedId] = useState(null);
  const [sortType, setSortType] = useState("time");
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sorted = [...data];
    switch (sortType) {
      case "time":
        sorted.sort(
          (a, b) => new Date(a.alarmTime || 0) - new Date(b.alarmTime || 0)
        );
        break;
      case "newest":
        sorted.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        );
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    setSortedData(sorted);
  }, [data, sortType]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getRemainingTime = (alarmTime) => {
    const now = new Date();
    const target = new Date(alarmTime);
    const diff = target - now;

    if (diff <= 0) return "⏰ Time's up";

    const diffInHours = diff / (1000 * 60 * 60);

    if (diffInHours > 24) {
      const daysLeft = Math.floor(diffInHours / 24);
      return `🗓 ${daysLeft} day${daysLeft > 1 ? "s" : ""} left`;
    } else {
      const hours = Math.floor(diffInHours);
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `⏳ ${hours}h ${minutes}m left`;
    }
  };

  const openEditModal = (task) => {
    setUpdatedData({
      id: task.id,
      title: task.title,
      desc: task.desc,
      important: task.important,
      alarmTime: task.alarmTime,
      notificationId: task.notificationId,
    });
    setInputVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <Picker
            selectedValue={sortType}
            onValueChange={(value) => setSortType(value)}
            style={styles.sortPicker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Time" value="time" />
            <Picker.Item label="Newest" value="newest" />
            <Picker.Item label="Oldest" value="oldest" />
            <Picker.Item label="A-Z" value="az" />
          </Picker>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {sortedData &&
            sortedData.map((task) => {
              const isExpanded = expandedId === task.id;

              return (
                <TouchableOpacity
                  key={task.id}
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() => toggleExpand(task.id)}
                >
                  <View style={styles.headerRow}>
                    <View style={{ marginBottom: 3, flex: 1 }}>
                      <Text style={styles.title}>{task.title}</Text>
                      {task.alarmTime && (
                        <Text style={styles.remainingTime}>
                          {getRemainingTime(task.alarmTime)}
                        </Text>
                      )}
                    </View>

                    <View style={styles.iconGroup}>
                      {task.important && (
                        <Ionicons
                          name="heart"
                          size={18}
                          color="#ef4444"
                          style={styles.icon}
                        />
                      )}
                      <TouchableOpacity onPress={() => openEditModal(task)}>
                        <Ionicons
                          name="information-circle-outline"
                          size={22}
                          color="#3b82f6"
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {isExpanded && (
                    <>
                      <Text style={styles.desc}>{task.desc}</Text>

                      <View style={styles.footerRow}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            {
                              backgroundColor: task.completed
                                ? "#047857"
                                : "#f87171",
                            },
                          ]}
                          onPress={() => dispatch(toggleComplete(task.id))}
                        >
                          <Text style={styles.statusText}>
                            {task.completed ? "Completed" : "Incomplete"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
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
    </SafeAreaView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sortLabel: {
    color: "#fff",
    marginRight: 8,
    fontSize: 16,
  },
  sortPicker: {
    flex: 1,
    color: "#fff",
  },
  list: {
    padding: 12,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginRight: 12,
  },
  remainingTime: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
  },
  desc: {
    fontSize: 14,
    color: "#d1d5db",
    marginVertical: 8,
  },
  footerRow: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statusButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 100,
  },
  statusText: {
    color: "#fff",
    fontSize: 15,
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
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    marginLeft: 8,
  },
});
