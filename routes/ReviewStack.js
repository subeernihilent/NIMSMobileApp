import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReviewRequestScreen from "../Screens/ReviewRequestScreen";
import LeaveList from "../Screens/MemberLeaveList";
import Header from "../Components/Header";
import ApproveRequest from "../Screens/ApproveRequest";

import ReviewTimesheet from "../Screens/ReviewTimesheet";
import ReviewUserTimesheet from "../Screens/ReviewUserTimesheet";
import TimesheetDetailRequest from "../Screens/TimesheetDetailRequest";


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
        name="ReviewRequest"
        component={ReviewRequestScreen}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title={"Review Request"} />
            ),
          };
        }}
      />

      <Stack.Screen
        name="memberLeaveList"
        component={LeaveList}
        options={{
          title: "Pending List",
        }}
      />

      <Stack.Screen
        name="approveRequest"
        component={ApproveRequest}
        options={{
          title: "ApproveRequest",
        }}
      />
       <Stack.Screen
        name="ReviewTimesheet"
        component={ReviewTimesheet}
        options={{
          title: "Review Timesheet",
        }}
      />
       <Stack.Screen
        name="ReviewUserTimesheet"
        component={ReviewUserTimesheet}
        options={{
          title: "Review Timesheet",
        }}
      />
        <Stack.Screen
        name="TimesheetDetailRequest"
        component={TimesheetDetailRequest}
        options={{
          title: "Review Timesheet",
        }}
      />

    </Stack.Navigator>
  );
}
