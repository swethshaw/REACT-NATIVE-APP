import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Sidebar from "../components/Home/Sidebar";
import { createStackNavigator } from "@react-navigation/stack";

import AllTasksScreen from "./AllTasks";
import CompletedTasksScreen from "./CompletedTasks";
import ImportantTasksScreen from "./ImportantTasks";
import IncompleteTasksScreen from "./IncompletedTasks";

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar />
      </View>
      <View style={styles.main}>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AllTasks">
          <Stack.Screen name="AllTasks" component={AllTasksScreen} />
          <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
          <Stack.Screen name="ImportantTasks" component={ImportantTasksScreen} />
          <Stack.Screen name="IncompleteTasks" component={IncompleteTasksScreen} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Dimensions.get("window").width >= 768 ? "row" : "column", // Responsive
    backgroundColor: "#1f2937",
  },
  sidebar: {
    width: Dimensions.get("window").width >= 768 ? "25%" : "100%",
    borderRightWidth: 1,
    borderColor: "#4b5563",
    padding: 10,
  },
  main: {
    flex: 1,
    padding: 10,
  },
});
