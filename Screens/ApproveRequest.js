import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
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
  const { HR } = route.params;
  const { role } = route.params;

  const [isLoading, setLoading] = useState(false);
  const [pendingLeave, setPendingLeave] = useState({});
  const [index, setIndex] = useState(0);


  const errorAlert = (message) => {
    Alert.alert(
      "Something went wrong",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const approveLeave = async () => {
    setLoading(true);
    try {
      var docRef = db.collection("LeaveApplied").doc(email);
      var leaveStatusRef = db.collection("userLeaveStatus").doc(email);
      var hrRef = db.collection("HR").doc(HR).collection("Leaves").doc(email);
      var managerRef = db
        .collection("Managers")
        .doc(manager)
        .collection("Leaves")
        .doc(email);
      if (role === "HR") {
        return db
          .runTransaction(function (transaction) {
            return Promise.all([
              transaction.get(docRef),
              transaction.get(leaveStatusRef),
            ]).then((docs) => {
              let doc1 = docs[0];
              let doc2 = docs[1];
              var objects = doc1.data().leaves;
              var indexForArray = 0
              var result = objects.find(function (obj, index) {
                if (obj.leaveApprovedByHR === false) {
                  indexForArray = index
                  return obj;
                }
              });

              result.leaveApprovedByHR = true;
              objects[indexForArray] = result;

              let leaveType = result.leaveType;
              let numberOfDays = result.numOfDays;

              var status = doc2.data().Leaves;
              var availabeBalance = status[0].values;
              var leaveTaken = status[4].values;

              if (leaveType == "Casual") {
                let count = availabeBalance.casual;
                availabeBalance.casual = count - numberOfDays;

                let countOne = leaveTaken.casual;
                leaveTaken.casual = countOne + numberOfDays;
              } else if (leaveType == "Sick") {
                let count = availabeBalance.sick;
                availabeBalance.sick = count - numberOfDays;

                let countOne = leaveTaken.sick;
                leaveTaken.sick = countOne + numberOfDays;
              } else if (leaveType == "Privilege") {
                let count = availabeBalance.privilege;
                availabeBalance.privilege = count - numberOfDays;

                let countOne = leaveTaken.privilege;
                leaveTaken.privilege = countOne + numberOfDays;
              }
              status[0].values = availabeBalance;
              status[4].values = leaveTaken;

              transaction.update(docRef, {leaves: objects});
              transaction.update(leaveStatusRef, { Leaves: status });
              transaction.delete(hrRef);
            });
          })
          .then(function () {
            setLoading(false);
            Alert.alert(
              "Alert",
              "Leave approved",
              [{ text: "OK", onPress: () => navigation.popToTop() }],
              { cancelable: false }
            );
          })
          .catch(function (err) {
            errorAlert(err);
          });
      } else {
        docRef.get().then(function (doc) {
          if (doc.exists) {
            var objects = doc.data().leaves;
            var indexForArray = 0
            var result = objects.find(function (obj, index) {
              if (obj.leaveApprovedByManager === false) {
                indexForArray = index
                return obj;
              }
            });
            result.leaveApprovedByManager = true;
            objects[indexForArray] = result;
         
            docRef
              .update({
                leaves: objects,
              })
              .then(function () {
                hrRef
                  .set({
                    leaveRef: db.doc("/LeaveApplied/" + email),
                  })
                  .then(function () {
                    managerRef.delete().then(function () {
                      setLoading(false);
                      Alert.alert(
                        "Alert",
                        "Leave Approved",
                        [{ text: "OK", onPress: () => navigation.popToTop() }],
                        { cancelable: false }
                      );
                    });
                  });
              });
          }
        });
      }
    } catch (e) {
      setLoading(false);
      errorAlert(e);
    }
  };

  const rejectLeave = async () => {
    setLoading(true);
    try {
      var docRef = db.collection("LeaveApplied").doc(email);
      var managerRef = db
        .collection("Managers")
        .doc(manager)
        .collection("Leaves")
        .doc(email);
      var hrRef = db.collection("HR").doc(HR).collection("Leaves").doc(email);
      if (role == "HR") {
        db.runTransaction(function (transaction) {
          return transaction.get(docRef).then(function (doc) {
            var leaves = doc.data().leaves;
            let arr = leaves.filter(function (item) {
              return item.leaveApprovedByHR !== false;
            });

            transaction.update(docRef, { leaves: arr });
            transaction.delete(hrRef);
          });
        })
          .then(function () {
            setLoading(false);
            Alert.alert(
              "Alert",
              "Leave rejected",
              [{ text: "OK", onPress: () => navigation.popToTop() }],
              { cancelable: false }
            );
          })
          .catch(function (err) {
            setLoading(false);
            errorAlert(err);
          });
      } else {
        docRef.get().then(function (doc) {
          if (doc.exists) {
            var objects = doc.data().leaves;
            let arr = objects.filter(function (item) {
              return item.leaveApprovedByManager !== false;
            });
            docRef
              .update({
                leaves: arr,
              })
              .then(function () {
                managerRef.delete().then(function () {
                  setLoading(false);
                  Alert.alert(
                    "Alert",
                    "Leave rejected",
                    [{ text: "OK", onPress: () => navigation.popToTop() }],
                    { cancelable: false }
                  );
                });
              });
          }
        });
      }
    } catch (e) {
      setLoading(false);
      errorAlert(e);
    }
  };

  const getLeaveDetail = async () => {
    try {
      setLoading(true);
      if (email !== null) {
        console.log(email);
        console.log(manager);
        if (role === "HR") {
          var docRef = db
            .collection(role)
            .doc(HR)
            .collection("Leaves")
            .doc(email);
          leaveDetailSnapshot(docRef, role);
        } else {
          var docRef = db
            .collection("Managers")
            .doc(manager)
            .collection("Leaves")
            .doc(email);
          leaveDetailSnapshot(docRef, role);
        }
      }
    } catch (e) {
      setLoading(false);
      errorAlert("not able to retrive email");
    }
  };

  const leaveDetailSnapshot = (docRef, role) => {
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let userLeaveInfo = doc.data();
          if (userLeaveInfo.leaveRef) {
            userLeaveInfo.leaveRef.get().then((res) => {
              let info = res.data();
              var arrayOfLeaves = info["leaves"];
              if (role === "HR") {
                var result = arrayOfLeaves.find(function (obj) {
                  return obj.leaveApprovedByHR === false;
                });
              } else {
                var result = arrayOfLeaves.find(function (obj) {
                  return obj.leaveApprovedByManager === false;
                });
              }
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
          <TouchableOpacity onPress={approveLeave}>
            <View style={styles.acceptView}>
              <MaterialIcons name="done" size={70} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={rejectLeave}>
            <AntDesign name="closecircle" size={90} color="red" />
          </TouchableOpacity>
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
