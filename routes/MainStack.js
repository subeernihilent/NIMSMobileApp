import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../Screens/Home";
import ApplyLeave from "../Screens/ApplyLeave";
import Header from '../Components/Header';


const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#66cdf3",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={Home}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header navigation={navigation} title={'Main'}/>,
          };
        }}
      />
      <Stack.Screen
        name="Apply Leave"
        component={ApplyLeave}
        options={{
          title: "ApplyLeave",
        }}
      />
    </Stack.Navigator>
  );
}