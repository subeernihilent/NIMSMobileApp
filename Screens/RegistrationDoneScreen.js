import React ,{useState}from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import {globalStyles} from '../GlobalStyle/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import ProceedButton from '../Components/ProceedButton';


export default function RegistrationSuccessful({route,navigation}) {

  const navigate = () => {
    navigation.push('Home')
  }

  const { emailId } = route.params;
    return (
      <LinearGradient
      colors={["#75a5f5", "#abc7f9", "#f5f5ff", "#Fff"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.text}>{'Your registration\n has been completed succesfuly!'}</Text>
      <Text style={styles.textTwo}>Your Nihilent id is</Text>
      <Text style={styles.textEmail}>{emailId}</Text>
      <ProceedButton onPress= {navigate}/>
    </LinearGradient>
    );
}

export const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    color: 'black',
    fontWeight: 'bold',
    fontSize:22,
    textAlign: 'center',
  },
  textTwo:{
    color: 'black',
    fontWeight: 'bold',
    marginTop:30,
    textAlign: 'center',
    fontSize:22,
  },
  textEmail:{
    color: '#3180fa',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:22,
  }

})

