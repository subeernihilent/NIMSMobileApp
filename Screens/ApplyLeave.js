import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";
import LeaveStaus from "../Components/LeaveStatus";
import { Entypo } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigateLock from "../Hooks/Lock";
import FromDate from "../Components/FromDateButton"
import ToDate from "../Components/ToDateButton"


export default function ApplyLeave({ navigation }) {
  const lock = useNavigateLock();
  const ApplyLeaveSecondScreen = () =>
    lock() && navigation.push("ApplyLeaveSecondScreen");
  const goLeaveStatus = () => lock() && navigation.push("LeaveStatus");

  return (
    <View style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LeaveStaus navigation={goLeaveStatus} />
        <View>
          <Text style={styles.typeText}>Leave Type :</Text>
          <TouchableOpacity style={styles.leaveType}>
            <Text style={styles.selectText}>Sick</Text>
            <Entypo name="select-arrows" size={24} color="grey" />
          </TouchableOpacity>
          <Text style={styles.typeText}>Approver :</Text>
          <TouchableOpacity style={styles.leaveType}>
            <Text style={styles.selectText}>Ashok Thube</Text>
            <Entypo name="select-arrows" size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <FromDate />
        <ToDate />
        <TouchableOpacity
          style={styles.nextButton}
          onPress={ApplyLeaveSecondScreen}
        >
          <MaterialIcons name="navigate-next" size={44} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  typeText: {
    fontSize: 22,
    marginVertical: 20,
  },
  leaveType: {
    borderWidth: 1,
    padding: 15,
    borderColor: "black",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    color: "grey",
  },

  nextButton: {
    marginTop: 50,
    borderColor: "#439dbb",
    borderRadius: 50,
    borderWidth: 1,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
