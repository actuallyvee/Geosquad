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
  
  //sabdalah - 11/30/2024 added to create a toggle feature for buttons
  const [markers, setMarkers] = useState({
    waterwell: null,
    disasterZone: null,
    medicalStation: null,
    safe: null,
  });


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


  const toggleMarker = (type) => {
    setMarkers((prevMarkers) => {
      // If marker exists, remove it; otherwise, add the new marker
      if (prevMarkers[type]) {
        return { ...prevMarkers, [type]: null };
      } else {
        return {
          ...prevMarkers,
          [type]: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        };
      }
    });
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }


  const getIcon = (type) => (markers[type] ? activeIcons[type] : defaultIcons[type]);

  const defaultIcons = {
  waterwell: waterwell,
  disaster: warning,
  medicalStation: medicalStation,
  safe: safe
  };

  const activeIcons = {
  waterwell: require('../../assets/waterwell.png'),
  disaster: require('../../assets/warning.png'),
  medicalStation: require('../../assets/medicalStation.png'),
  safe: require('../../assets/safe.png'),
  };


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
        {Object.entries(markers).map(([type, coords]) => 
          coords && (
            <Marker
            key={type}
            coordinate={coords}
            title={type} 
            description={`This is a ${type}`} 
            image={getIcon(type)} // Add the image dynamically

          />
          )
        )}


      </MapView>
      <View style={{position: 'absolute', top: 50, right: 10, gap: 10}}>
        <MapButton title="FILTER" icon={filter}/>
      </View>
      <View style={{position: 'absolute', bottom: 20, right: 10, gap: 10}}>
        <MapButton title="ADD WATERWELL" icon={waterwell} onPress={()=> toggleMarker('waterwell')}/>
        <MapButton title="MARK DISASTER ZONE" icon={warning} onPress={()=> toggleMarker('disaster')}/>
        <MapButton title="ADD MEDICAL STATION" icon={medicalStation} onPress={()=> toggleMarker('medicalStation')}/>
        <MapButton style={{bottom: 100}} title="MARK AS SAFE" icon={safe} onPress={()=> toggleMarker('safe')}/>
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
