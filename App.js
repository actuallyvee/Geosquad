import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/login';

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "GeoSquad",
      
    },
  }
);

export default createAppContainer(navigator);
