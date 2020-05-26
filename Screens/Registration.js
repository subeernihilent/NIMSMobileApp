import React ,{useState}from 'react';
import { StyleSheet,Button} from 'react-native';
import {globalStyles} from '../GlobalStyle/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import FormComponent from '../Components/FormComponent'
import { MaterialIcons } from '@expo/vector-icons';

export default function Registration({navigation}) {
    return (
      <LinearGradient
        colors={["#75a5f5", "#abc7f9", "#f5f5ff", "#Fff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={globalStyles.container}
      >
      <MaterialIcons name="arrow-back" size={24} color="black" style={styles.backButton} onPress={() => navigation.pop()}/>
      <FormComponent navigation={navigation}/>
      </LinearGradient>
    );
}

export const styles = StyleSheet.create({
  backButton: {
    position:"absolute",
    left:30,
    marginTop:30
  }
})

