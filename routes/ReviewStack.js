import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ReviewRequestScreen from "../Screens/ReviewRequestScreen";
import Header from '../Components/Header';


const Stack = createStackNavigator()

export default function ReviewStack() {
  return (
    <Stack.Navigator
      initialRouteName="reviewRequest"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#439dbb",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="reviewRequest"
        component={ReviewRequestScreen}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header navigation={navigation} title={'Review Request'}/>,
          };
        }}
      />
    </Stack.Navigator>
  );
}