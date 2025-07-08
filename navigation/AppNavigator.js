import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authActions } from "../redux/authSlice";

import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import HomeScreen from "../screens/Home";
import AllTasksScreen from "../screens/AllTasks";
import ImportantTasksScreen from "../screens/ImportantTasks";
import CompletedTasksScreen from "../screens/CompletedTasks";
import IncompleteTasksScreen from "../screens/IncompletedTasks";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      if (id && token) {
        dispatch(authActions.login());
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AllTasks" component={AllTasksScreen} />
            <Stack.Screen name="ImportantTasks" component={ImportantTasksScreen} />
            <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
            <Stack.Screen name="IncompleteTasks" component={IncompleteTasksScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
