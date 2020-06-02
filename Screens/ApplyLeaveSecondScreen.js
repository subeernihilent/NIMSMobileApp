import React ,{useState}from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput} from 'react-native';
import { globalStyles } from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ApplyLeaveSecondScreen( ) {
    return (
      <View style={globalStyles.container}>
        <ScrollView showsVerticalScrollIndicator = {false}>
            <Text style={styles.titleHeading}>Pupose :</Text>
            <TextInput style={[globalStyles.inputBox,styles.puposeTextInput]}  multiline={true} placeholder={"Pupose"}/>
            <Text style={styles.titleHeading}>Address :</Text>
            <TextInput  style={[globalStyles.inputBox,styles.textInput]} placeholder={"Address"}/>
            <Text style={styles.titleHeading}>Email :</Text>
            <TextInput  style={[globalStyles.inputBox,styles.textInput]} placeholder={"Email"}/>
            <Text style={styles.titleHeading}>Contact :</Text>
            <TextInput  style={[globalStyles.inputBox,styles.textInput]} placeholder={"Contact"}/>
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
}

export const styles = StyleSheet.create({
    titleHeading:{
        fontSize:22,
        fontWeight:'300'
    },
    puposeTextInput:{
        marginTop:10,
        padding:40,
        borderColor:"#439dbb",
        textAlign: 'left'
    },
    textInput:{
        marginTop:10,
        padding:20,
        borderColor:"#439dbb"
    },
    submitButton:{
        marginVertical:30,
        borderColor:'#fff',
        backgroundColor:'#439dbb',
        borderRadius:40,
        padding:25,
        justifyContent:'center',
        alignItems:'center'
    },
    submitText:{
        color:'#fff',
        fontSize:18,

    }
})

