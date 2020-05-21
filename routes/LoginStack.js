
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import Welcome from '../Screens/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthStackNavigator} from '../Navigation/AuthStackNavigator';

export default function LoginStack() {
    const LoginStack = createStackNavigator();
    return (
      <NavigationContainer>
        <LoginStack.Navigator>
          <LoginStack.Screen name={"Welcome"} component={Welcome}  options={{
          title: "Welcome",
          headerShown: false,
          animationEnabled: false,
        }} />
          <LoginStack.Screen name={"Login"} component={Login}  options={{
          title: "Login",
          headerShown: false,
          animationEnabled: false,
        }} />
          <LoginStack.Screen name={"Home"} component={Home}  options={{
          title: "Home",
        }} />
        <LoginStack.Screen name={"Register"} component={AuthStackNavigator}  options={{
          title: "Register",
          headerShown: false,
          animationEnabled: false,
        }}/>

        </LoginStack.Navigator>
      </NavigationContainer>
    );
}



