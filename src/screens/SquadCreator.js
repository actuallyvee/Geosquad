import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SquadCreator = () => {
  return (
    <LinearGradient
      colors={["#5377AE", "#4C6EA0", "#4A6B9C", "#364E72", "#223148"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Squad Creator</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F3FA12",
  },
});

export default SquadCreator;
