import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Login = (props) => {
    return (
        <LinearGradient
            colors={['#5377AE', '#4C6EA0', '#4A6B9C', '#364E72', '#223148']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={{paddingTop: 50, fontSize: 60, fontWeight: 'bold', color: '#F3FA12'}}>GeoSquad</Text>
            </View>
                <View style={styles.middleContainer}>
                    <Text style={{alignSelf:'flex-start', paddingLeft: 45, color: 'white', fontSize: 15}}>Credentials</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="USERNAME"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="PASSWORD"
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={() => {props.navigation.navigate("Map")}}>
                        <Text style={{color: "white", fontSize: 15}}>LOG IN</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', gap: 10, alignSelf: 'flex-start', paddingLeft: 45}}>
                        <Text style={{color:'white'}}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity>
                            <Text style={{color: "#A6D941",textDecorationLine: 'underline'}}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
                <TouchableOpacity style={{alignSelf:'flex-start', paddingLeft: 45, paddingBottom: 40}} onPress={() => {props.navigation.navigate("AboutUsScreen")}}>
                    <Text style={{color:'white'}}>
                        About Us
                    </Text>
                </TouchableOpacity>
            
            </View>
        </LinearGradient>
       
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
    textInput: {
        width: "80%",
        height: 50,
        borderColor: "white",
        borderWidth: 1,
        color: "white",
        backgroundColor: "#A6D941",
    },
    loginButton: {
        width: "80%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black"

    },
    container: {
        flex: 1,
      },
    topContainer: {
        alignItems: 'center', 
        paddingTop: 80,
         
    },

    middleContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 20,
      },
})

Login.navigationOptions = () => {
    return {
        headerShown: false,
    }
}

export default Login;