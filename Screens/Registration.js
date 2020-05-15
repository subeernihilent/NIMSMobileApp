import React ,{useState}from 'react';
import { StyleSheet,Button} from 'react-native';
import {globalStyles} from '../GlobalStyle/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import FormComponent from '../Components/FormComponent'

export default function Registration() {
    return (
      <LinearGradient
        colors={["#75a5f5", "#abc7f9", "#f5f5ff", "#Fff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={globalStyles.container}
      >
      
      <FormComponent/>
      </LinearGradient>
    );
}

export const styles = StyleSheet.create({
})

