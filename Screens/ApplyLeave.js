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
import { MaterialIcons } from "@expo/vector-icons";
import useNavigateLock from "../Hooks/Lock";
import FromDate from "../Components/FromDateButton"
import ToDate from "../Components/ToDateButton"
import LeaveType from "../Components/LeaveTypeButton"
import ManagerType from "../Components/SelectManagerButton"

export default function ApplyLeave({ navigation }) {
  const lock = useNavigateLock();
  const ApplyLeaveSecondScreen = () =>
    lock() && navigation.push("ApplyLeaveSecondScreen");
  const goLeaveStatus = () => lock() && navigation.push("LeaveStatus");
  const [fromDate, setFromDate] = useState("From Date");
  const [toDate, setToDate] = useState("To Date");
  const retriveDateFirstDate = (firstDate) => {
       setFromDate(firstDate)
  }

  const retriveSecondDate = (secondDate) => {
    setToDate(secondDate)
}

  return (
    <View style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LeaveStaus navigation={goLeaveStatus} />
        <View>
          <LeaveType/>
          <ManagerType/>
        </View>
        <FromDate onPress={retriveDateFirstDate} />
        <ToDate minimumDate={fromDate} onPress={retriveSecondDate} />
        <TouchableOpacity style={styles.nextButton} onPress={ApplyLeaveSecondScreen}>
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
