import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";
import Async from "../Utils/AsyncKey";
import { AsyncStorage } from "react-native";
import { db } from "../Enviroment/FirebaseConfig";
import useNavigateLock from "../Hooks/Lock";
import LeaveDetails from "../Components/LeaveDetails";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ApproveRequest({ route, navigation }) {
  const { email } = route.params;
  const { manager } = route.params;
  const [isLoading, setLoading] = useState(false);
  const [pendingLeave, setPendingLeave] = useState({});

  const errorAlert = (message) => {
    Alert.alert(
      "Something went wrong",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const getLeaveDetail = async () => {
    try {
      setLoading(true);
      if (email !== null) {
        console.log(email);
        console.log(manager);
        var docRef = db
          .collection("Managers")
          .doc(manager)
          .collection("Leaves")
          .doc(email);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              let userLeaveInfo = doc.data();
              if (userLeaveInfo.leaveRef) {
                userLeaveInfo.leaveRef.get().then((res) => {
                  let info = res.data();
                  var arrayOfLeaves = info["leaves"];
                  var result = arrayOfLeaves.find(function (obj) {
                    return obj.leaveApprovedByHR === false;
                  });
                  setPendingLeave(result);
                  setLoading(false);
                });
              }
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

  useEffect(() => {
    getLeaveDetail();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <LeaveDetails details={pendingLeave} />
        <View style={styles.maineView}>
          <View style={styles.acceptView}>
            <MaterialIcons name="done" size={70} color="black" />
          </View>
          <AntDesign name="closecircle" size={90} color="red" />
        </View>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  maineView: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  acceptView: {
    height: 90,
    width: 90,
    backgroundColor: "green",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
