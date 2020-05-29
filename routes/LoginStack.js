
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import React from 'react';
import {AuthStackNavigator} from '../routes/AuthStackNavigator';

export default function LoginStack() {
    const LoginStack = createStackNavigator();
    return (
        <LoginStack.Navigator initialRouteName="Login">
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
    );
}


