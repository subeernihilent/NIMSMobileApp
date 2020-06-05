import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../Screens/Home";
import ApplyLeave from "../Screens/ApplyLeave";
import Header from '../Components/Header';
import ApplyLeaveSecondScreen from '../Screens/ApplyLeaveSecondScreen'
import LeaveStatus from '../Screens/LeaveStatus'
import Timesheet from '../Screens/Timesheet';
import TimesheetSecondScreen from '../Screens/TimesheetSecondScreen';
import TimesheetDetailScreen from '../Screens/TimesheetDetailScreen';

const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="NIMS"
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
        name="NIMS"
        component={Home}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title={"NIMS"} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="ApplyLeave"
        component={ApplyLeave}
        options={{
          title: "ApplyLeave",
        }}
      />
      <Stack.Screen
        name="ApplyLeaveSecondScreen"
        component={ApplyLeaveSecondScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="LeaveStatus"
        component={LeaveStatus}
        options={{
          title: "Leave Status",
        }}
      />
      <Stack.Screen
        name="Timesheet"
        component={Timesheet}
        options={{
          title: "Timesheet",
        }}
      />
      <Stack.Screen
        name="TimesheetSecondScreen"
        component={TimesheetSecondScreen}
        options={{
          title: "Timesheet",
        }}
      />

      <Stack.Screen
        name="TimesheetDetailScreen"
        component={TimesheetDetailScreen}
        options={{
          title: "Timesheet",
        }}
      />
    </Stack.Navigator>
  );
}