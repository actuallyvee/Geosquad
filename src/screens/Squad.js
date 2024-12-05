import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Context as DataContext} from '../context/DataContext'

const SquadScreen = () => {
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
          <Text style={styles.title}>{state.squad.name}</Text>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>Squad Created: {state.squad.createdAt.substring(0, 4)}</Text>
            <Text style={styles.infoText}>User Count: {state.squad.members.length}</Text>
            {state.user.userType === 'creator' ? <Text style={styles.infoText}>Invitation Code: {state.squad.invitationCode}</Text> : null}
          </View>
          
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
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  infoText: {
    color: 'white',
  },
  infoView: {
    width: '100%',
    gap: 20,
    paddingLeft: 30,
    marginTop: 20,
  },
});

export default SquadScreen;
