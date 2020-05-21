import React ,{useState}from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';


export default function ProceedButton({onPress}) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>Proceed</Text>
      </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    container: {
        marginVertical:30,
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