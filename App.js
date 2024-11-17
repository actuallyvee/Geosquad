import { StatusBar } from 'expo-status-bar';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native'
import settings from "./assets/settings.png"
import map from "./assets/map.png"
import squad from "./assets/squad.png"
import profile from "./assets/profile.png"
import LoginScreen from './src/screens/Login';
import AboutUsScreen from './src/screens/AboutUs';
import MapScreen from './src/screens/Map';

const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
      SignUp: LoginScreen,
      AboutUsScreen: AboutUsScreen,
    }),
    mainFlow: createMaterialBottomTabNavigator({
      Settings: {
          screen: AboutUsScreen,
          navigationOptions: {
            tabBarIcon: ({ color }) => <Icon name="cog" color={color} size={26} />,
          },
      },
      Map: {
          screen: MapScreen,
          navigationOptions: {
            tabBarIcon: ({ color }) => <Icon name="map-marker" color={color} size={24}/>,
          },
      },
      Squad: {
          screen: AboutUsScreen,
          navigationOptions: {
            tabBarIcon: ({ color }) => <Icon name="account-group" color={color} size={24} />,
          },
      },
      Account: {
          screen: AboutUsScreen,
          navigationOptions: {
            tabBarIcon: ({ color }) => <Icon name="account" color={color} size={24} />,
          },
      }
    },
    {
      barStyle: {
        backgroundColor: "#A6D941",
        height: 80, 
        paddingBottom: 20, 
      },
      labeled: false,
    })


});

export default createAppContainer(switchNavigator);
