import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Registration from '../Screens/Registration';
import RegistrationSuccessful from '../Screens/RegistrationDoneScreen';

const AuthStack = createStackNavigator();
const RegisterStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'RegisterStack'}>
        {() => (
          <RegisterStack.Navigator
            mode={'card'}
            screenOptions={{
              headerShown: false,
            }}>
            <RegisterStack.Screen name={'Registration'} component={Registration} />
          </RegisterStack.Navigator>
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name={'RegistrationSuccessful'} component={RegistrationSuccessful} />
    </AuthStack.Navigator>
  );
}
