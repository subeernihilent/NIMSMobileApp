import { decode, encode } from 'base-64';
import React from 'react';
import Navigator from './routes/LoginStack';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import Registration from './Screens/Registration';
import {AuthStackNavigator} from './Navigation/AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthContext from './Context/AuthContext';
import LoginStack from './routes/LoginStack';



export default function App() {
const RootStack = createStackNavigator();


  return (
    //<Navigator />
    <LoginStack/>
   
      // <NavigationContainer>
      //   <RootStack.Navigator
      //     screenOptions={{
      //       headerShown: false,
      //       animationEnabled: false,
      //     }}
      //   >
      //     <RootStack.Screen name={"AuthStack"} component={AuthStackNavigator} />
      //   </RootStack.Navigator>
      // </NavigationContainer>
   // </AuthContext>
  );
}


