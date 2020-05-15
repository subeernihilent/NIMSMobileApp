import React ,{useState}from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';

export default function CustomButtonRegister( ) {
    return (
      <View style={styles.container} >
        <Text style={styles.text}>Register</Text>
      </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        borderColor:'grey',
        borderRadius:30,
        width:'60%',
        padding:10,
        backgroundColor:'white',
        alignSelf:'center',
    },
    text:{
        padding:10,
        fontSize:14,
        color:'#3180fa',
        alignSelf:'center'
    },
})

