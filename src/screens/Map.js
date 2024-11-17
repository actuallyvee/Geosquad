import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapButton from '../components/MapButton';
import safe from "../../assets/safe.png"
import filter from "../../assets/filter.png"
import warning from "../../assets/warning.png"
import waterwell from "../../assets/waterwell.png"
import medicalStation from "../../assets/medicalStation.png"

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    };

    getLocation();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={"Your Location"}
          description={"This is your current location"}
        />
      </MapView>
      <View style={{position: 'absolute', top: 50, right: 10, gap: 10}}>
        <MapButton title="FILTER" icon={filter}/>
      </View>
      <View style={{position: 'absolute', bottom: 20, right: 10, gap: 10}}>
        <MapButton title="ADD WATERWELL" icon={waterwell}/>
        <MapButton title="MARK DISASTER ZONE" icon={warning}/>
        <MapButton title="ADD MEDICAL STATION" icon={medicalStation}/>
        <MapButton style={{bottom: 100}} title="MARK AS SAFE" icon={safe}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
