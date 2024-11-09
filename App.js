import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/Login';
import AboutUs from './src/screens/AboutUs';

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    About: AboutUs,
  },
  {
    initialRouteName: "About",
    defaultNavigationOptions: {
      title: "GeoSquad",
      
    },
  }
);

export default createAppContainer(navigator);
