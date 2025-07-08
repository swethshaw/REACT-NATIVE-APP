import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authSlice";
import { API } from "../../config";

// Icons
// import { CgNotes } from "react-icons/cg"; // REPLACE
// import { MdLabelImportant } from "react-icons/md"; // REPLACE
// import { FaCheckDouble } from "react-icons/fa6"; // REPLACE
// import { TbNotebookOff } from "react-icons/tb"; // REPLACE

// Replace all with compatible vector icons:
import { MaterialIcons, Feather, Entypo, FontAwesome } from "@expo/vector-icons";

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchData = async () => {
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(API.GET_ALL_TASKS, {
        headers: {
          id,
          authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.data);
    } catch (error) {
      console.error("Sidebar fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(authActions.logout());
    navigation.replace("Login");
  };

  const menuItems = [
    { title: "All Tasks", icon: <Feather name="list" size={20} />, screen: "AllTasks" },
    { title: "Important Tasks", icon: <MaterialIcons name="star" size={20} />, screen: "ImportantTasks" },
    { title: "Completed Tasks", icon: <Entypo name="check" size={20} />, screen: "CompletedTasks" },
    { title: "Incomplete Tasks", icon: <FontAwesome name="times" size={20} />, screen: "IncompleteTasks" },
  ];

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <View style={styles.separator} />
        </>
      )}
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            {item.icon}
            <Text style={styles.menuText}>  {item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1f2937",
    flex: 1,
  },
  username: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  email: {
    color: "#9ca3af",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#4b5563",
    marginVertical: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#6b7280",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
