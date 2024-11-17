import React from "react";
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'


const MapButton = (props) => {

    return(
        <TouchableOpacity style={styles.button}>
            <View style={{height: "100%",backgroundColor: 'white', borderWidth: 1, borderColor: "black", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10}}>
                <Image style={{left: 5, marginLeft: 10}} source={props.icon}/>
                <Text style={{fontSize: 10, textAlign: 'center', flexWrap: 'wrap', width: 90}}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
})

export default MapButton