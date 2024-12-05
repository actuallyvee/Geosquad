import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Switch } from 'react-native';
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
  
  const [markers, setMarkers] = useState({
    waterwell: null,
    disasterZone: null,
    medicalStation: null,
    safe: null,
  });

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    waterwell: true,
    disaster: true,
    medicalStation: true,
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


  const getIcon = (type) =>  activateMarker[type]; //name change for clarity

 

  const activateMarker = {
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
        
        {Object.entries(markers).map(([type, coords]) => //loop destructuring if coords (valid/not null) the marker renders
          coords 
          && filterSettings[type] && ( //Check filter settings  
            <Marker
            key={type}
            coordinate={coords}
            title={type} //optional
            description={`This is a ${type}`}  //not necessary can be removed . 
            image={getIcon(type)} // activate marker

          />
          )
        )}


      </MapView>

      {/* Filter Button */}
      <View style={{ position: 'absolute', top: 50, right: 10 }}>
        <MapButton
          title="FILTER"
          icon={filter}
          onPress={() => setFilterVisible(!filterVisible)}
        />
        {/* Dropdown Menu */}
        {filterVisible && (
          <View style={styles.dropdown}>
            {Object.keys(filterSettings).map((type) => (
              <View key={type} style={styles.dropdownItem}>
                <Text style={styles.dropdownLabel}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
                <Switch
                  value={filterSettings[type]}
                  onValueChange={() =>
                    setFilterSettings((prevSettings) => ({
                      ...prevSettings,
                      [type]: !prevSettings[type],
                    }))
                  }
                  /* thumbColor -> the circle color when on/off.
                     trackColor -> false doesn't seem to change anything. True changes the background of the button. Wonder if we could add a little image in there 
                     Green- a6d841
                     Blue- 5978b1
                     Yellow- e7bb2d
                     Red- ff0d0f
                     */
                  thumbColor={filterSettings[type] ? "#a6d841" : "#aa1111" }
                  trackColor={{ false: "#767577", true: "#5174aa" }}
                  
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Marker Buttons */}
      <View style={{ position: 'absolute', bottom: 20, right: 10, gap: 10 }}>
        <MapButton title="ADD WATERWELL" icon={waterwell} onPress={() => toggleMarker('waterwell')} />
        <MapButton title="MARK DISASTER ZONE" icon={warning} onPress={() => toggleMarker('disaster')} />
        <MapButton title="ADD MEDICAL STATION" icon={medicalStation} onPress={() => toggleMarker('medicalStation')} />
        <MapButton title="MARK AS SAFE" icon={safe} onPress={() => toggleMarker('safe')} />
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

  // Style For Filter
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    position: 'absolute',
    top: 90,
    right: 0,
    width: 200,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownLabel: {
    fontSize: 16,
  },
});
  // End Filter Style

export default MapScreen;