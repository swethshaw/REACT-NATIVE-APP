// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import AllTasksScreen from "./AllTasks";
// import ImportantTasksScreen from "./ImportantTasks";
// import CompletedTasksScreen from "./CompletedTasks";
// import IncompleteTasksScreen from "./IncompletedTasks";

// const Tab = createBottomTabNavigator();

// const HomeScreen = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName="AllTasks"
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             switch (route.name) {
//               case "AllTasks":
//                 iconName = "home";
//                 break;
//               case "Important":
//                 iconName = "grid-view";
//                 break;
//               case "Completed":
//                 iconName = "bookmark";
//                 break;
//               case "Incomplete":
//                 iconName = "person";
//                 break;
//             }
//             return <Icon name={iconName} size={24} color={color} />;
//           },
//           tabBarActiveTintColor: "#ffffff",
//           tabBarInactiveTintColor: "#9ca3af",
//           tabBarStyle: {
//             backgroundColor: "#111827",
//             borderTopWidth: 0,
//             paddingVertical: 5,
//             height: 65,
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             position: "absolute",
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//           },
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="AllTasks" component={AllTasksScreen} options={{ tabBarLabel: "Home" }} />
//         <Tab.Screen name="Important" component={ImportantTasksScreen} options={{ tabBarLabel: "Services" }} />
//         <Tab.Screen name="Completed" component={CompletedTasksScreen} options={{ tabBarLabel: "Activity" }} />
//         <Tab.Screen
//           name="Incomplete"
//           component={IncompleteTasksScreen}
//           options={{
//             tabBarLabel: "Account",
//             tabBarBadge: 1,
//             tabBarBadgeStyle: {
//               backgroundColor: "#3b82f6",
//               color: "#ffffff",
//               fontSize: 10,
//             },
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default HomeScreen;
