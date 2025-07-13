import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
});
