import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global";
import LeaveStaus from "../Components/LeaveStatus";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigateLock from "../Hooks/Lock";
import FromDate from "../Components/FromDateButton";
import ToDate from "../Components/ToDateButton";
import LeaveType from "../Components/LeaveTypeButton";
import ManagerType from "../Components/SelectManagerButton";
import Async from "../Utils/AsyncKey";
import { AsyncStorage } from "react-native";
import { db } from "../Enviroment/FirebaseConfig";
import { app } from "firebase";

export default function ApplyLeave({ navigation }) {
  const lock = useNavigateLock();
  const ApplyLeaveSecondScreen = () =>
    lock() && navigation.navigate('ApplyLeaveSecondScreen', {
      leave: leave,
      manager: manager,
      fromDate: fromDate,
      toDate: toDate,
      halfLeave: halfLeave,
      email: userEmail
    });
      
  const goLeaveStatus = () => lock() && navigation.push("LeaveStatus");
  const [fromDate, setFromDate] = useState("From Date");
  const [toDate, setToDate] = useState("To Date");
  const [isLoading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);
  const [leaveTypeValidation, setLeaveTypeValidation] = useState(false);
  const [managerTypeValidation, setManagerTypeValidation] = useState(false);
  const [fromDateValidation, setFromDateValidation] = useState(false);
  const [toDateValidation, setToDateValidation] = useState(false);
  const [leave, setLeave] = useState("Select Leave");
  const [manager, setManger] = useState("Select Manager");
  const [halfLeave, setHalfLeave] = useState(false);
  const [userEmail, setEmail] = useState("");


  const validationCheck = () => {
    if (leave == "Select Leave") {
      setLeaveTypeValidation(true)
    }else if (manager == "Select Manager") {
      setManagerTypeValidation(true)
    }else if (fromDate == "From Date") {
      setFromDateValidation(true)
    }else if (toDate == "To Date"){
      setToDateValidation(true)
    }else {
      ApplyLeaveSecondScreen()
    }
  };

  const getHalfLeave = (toggle) => {
    setHalfLeave(toggle)
  }

  const retriveDateFirstDate = (firstDate) => {
    setFromDateValidation(false)
    setFromDate(firstDate);
    setToDate("To Date");
  };

  const leaveType = (leave) => {
    setLeaveTypeValidation(false)
    setLeave(leave);
  };

  const managerType = (manager) => {
    setManagerTypeValidation(false)
    setManger(manager);
  };

  const errorAlert = (message) => {
    Alert.alert(
      "Something went wrong",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const getEmail = async () => {
    try {
      setLoading(true);
      const email = await AsyncStorage.getItem(Async.EMAIL_KEY);
      if (email !== null) {
        setEmail(email);
        var docRef = db.collection("users").doc(email);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setLoading(false);
              let userInfo = doc.data();
              let managersArray = userInfo["managers"];
              managersArray.forEach((element) =>
                setManagers((oldArray) => [...oldArray, element])
              );
            } else {
              setLoading(false);
              errorAlert("No such document!");
            }
          })
          .catch(function (error) {
            setLoading(false);
            errorAlert(error);
          });
      }
    } catch (e) {
      setLoading(false);
      errorAlert("not able to retrive email");
    }
  };

  const retriveSecondDate = (secondDate) => {
    setToDateValidation(false)
    setToDate(secondDate);
  };

  useEffect(() => {
    getEmail();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LeaveStaus navigation={goLeaveStatus} />
        <View>
           <LeaveType selection={leaveType} leave={leave} />
          {leaveTypeValidation &&  <Text style={globalStyles.errorText}>select leave type</Text>}
          <ManagerType managerList={managers}  selection={managerType} manager={manager}/>
          {managerTypeValidation &&  <Text style={globalStyles.errorText}>select manager</Text>}        
        </View>
        <FromDate onPress={retriveDateFirstDate} getHalfLeave={getHalfLeave}/>
        {fromDateValidation && <Text style={globalStyles.errorText}>select from date</Text>} 
        <ToDate
          minimumDate={fromDate}
          onPress={retriveSecondDate}
          toDate={toDate}
        />
        {toDateValidation && <Text style={globalStyles.errorText}>select to date</Text>} 
        <TouchableOpacity
          style={styles.nextButton}
          onPress={validationCheck}
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
