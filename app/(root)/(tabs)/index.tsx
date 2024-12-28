import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Tabs Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
