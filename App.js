import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

import store from "./store/store";
import { loadTasks } from "./utils/storage";
import { setTasks } from "./store/tasksSlice";
import { configureNotificationChannel } from "./utils/notifications";

import AllTasksScreen from "./screens/AllTasks";
import CompletedTasksScreen from "./screens/CompletedTasks";
import ImportantTasksScreen from "./screens/ImportantTasks";
import IncompleteTasksScreen from "./screens/IncompletedTasks";

const Tab = createBottomTabNavigator();

const InitApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Please enable notifications to use the alarm feature.");
      }

      if (Platform.OS === "android") {
        await configureNotificationChannel();
      }

      const storedTasks = await loadTasks();
      dispatch(setTasks(storedTasks));
    })();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        initialRouteName="All"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#1f2937",
            borderTopColor: "#374151",
            paddingBottom: 5,
            height: 60,
          },
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "All":
                iconName = "list";
                break;
              case "Important":
                iconName = "heart";
                break;
              case "Completed":
                iconName = "checkmark-done";
                break;
              case "Incomplete":
                iconName = "time";
                break;
              default:
                iconName = "ellipse";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="All" component={AllTasksScreen} />
        <Tab.Screen name="Important" component={ImportantTasksScreen} />
        <Tab.Screen name="Incomplete" component={IncompleteTasksScreen} />
        <Tab.Screen name="Completed" component={CompletedTasksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1f2937" }}>
        <InitApp />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
