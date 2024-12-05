import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Modal, Switch } from 'react-native';
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
      <View style={{position: 'absolute', top: 50, right: 10, gap: 10 }}>
        <MapButton title="FILTER" icon={filter} onPress={() => {
          console.log("Filter button pressed!");
          setFilterVisible(true);
        }} />
        
      </View>

      <View style={{ position: 'absolute', bottom: 20, right: 10, gap: 10 }}>
        <MapButton title="ADD WATERWELL" icon={waterwell} onPress={() => toggleMarker('waterwell')} />
        <MapButton title="MARK DISASTER ZONE" icon={warning} onPress={() => toggleMarker('disaster')} />
        <MapButton title="ADD MEDICAL STATION" icon={medicalStation} onPress={() => toggleMarker('medicalStation')} />
        <MapButton title="MARK AS SAFE" icon={safe} onPress={() => toggleMarker('safe')} />
      </View>

      {/* Modal for Filters */}
      <Modal
        visible={filterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Markers</Text>
          {Object.keys(filterSettings).map((type) => (
            <View key={type} style={styles.filterItem}>
              <Text style={styles.filterLabel}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              <Switch
                value={filterSettings[type]}
                onValueChange={() =>
                  setFilterSettings((prevSettings) => ({
                    ...prevSettings,
                    [type]: !prevSettings[type],
                  }))
                }
              />
            </View>
          ))}
          <Button title="Close" onPress={() => setFilterVisible(false)} />
        </View>
      </Modal>
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '80%', // Set a fixed width relative to the screen
    alignSelf: 'center', // Center horizontally
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '50%', // Limit height to half the screen
    elevation: 5, // Add shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    marginTop: 138
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
    width: '100%',
  },
  filterLabel: {
    fontSize: 16,
  }
  // End Filter Style

});

export default MapScreen;