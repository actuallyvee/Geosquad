import React, {useEffect, useContext} from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Context as DataContext} from '../context/DataContext'

const ProfileScreen = () => {
  const {state} = useContext(DataContext)

  return (
    <LinearGradient
      colors={["#5377AE", "#4C6EA0", "#4A6B9C", "#364E72", "#223148"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.imagePlaceholder} />
          <Text style={styles.name}>{state.user.firstName} {state.user.lastName}</Text>
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
  },
  topContainer: {
    alignItems: "center",
    paddingTop: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F3FA12",
    marginLeft: 30,
    alignSelf: 'flex-start'
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
    borderWidth: 2,
    borderColor: "#F3FA12",
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
