import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Button,
} from "react-native";
import { globalStyles } from "../styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import { db } from "../Enviroment/FirebaseConfig";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase/app";

const reviewSchema = yup.object({
  purpose: yup.string().required().min(3),
  address: yup.string().required().min(3),
  email: yup.string().email().required(),
  contact: yup.string().required().min(10),
});

export default function ApplyLeaveSecondScreen({ navigation, route }) {
  const { leave } = route.params;
  const { manager } = route.params;
  const { fromDate } = route.params;
  const { toDate } = route.params;
  const { halfLeave } = route.params;
  const { email } = route.params;
  const [numberOfDay, setNumberOfDay] = useState(0);
  const [modalOpen, setModalopen] = useState(false);

  //const [userEmail,setEmail] = useState("")

  const numberOfDays = () => {
    var partsOfDateOne = fromDate.split("-");
    var partsOfDateTwo = toDate.split("-");
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(
      partsOfDateOne[0],
      partsOfDateOne[1] - 1,
      partsOfDateOne[2]
    );
    const secondDate = new Date(
      partsOfDateTwo[0],
      partsOfDateTwo[1] - 1,
      partsOfDateTwo[2]
    );
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    let count = diffDays + 1;
    console.log("days", count);

    setNumberOfDay(count);
  };

  const errorAlert = (message) => {
    Alert.alert(
      "Something went wrong",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const poptoHomeScreen = () => {
    navigation.popToTop();
  };

  useEffect(() => {
    numberOfDays();
    return () => {
      setModalopen(false);
    };
  }, []);

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="fade" transparent={true}>
        <View style={styles.modalOuterView}>
          <View style={styles.modalInnerView}>
            <Text style={styles.alertText}> Leave applied successfuly </Text>
            <TouchableOpacity
              style={styles.okayButton}
              onPress={poptoHomeScreen}
            >
              <Text style={styles.submitText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Formik
        initialValues={{
          purpose: "",
          address: "",
          email: "",
          contact: "",
        }}
        validationSchema={reviewSchema}
        onSubmit={(values, { resetForm }) => {
          numberOfDays();
          let batch = db.batch();
          var managerRef = db.collection("Managers").doc(manager);
          var leaveRef = managerRef.collection("Leaves").doc(email);
          const usersRef = db.collection("LeaveApplied").doc(email);
          usersRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
              let leaveList = docSnapshot.data();
              let leaveVaules = leaveList["leaves"];
              var result = false;
              result = leaveVaules.find(function (obj) {
                if (
                  obj.leaveApprovedByManager === false ||
                  obj.leaveApprovedByHR === false
                ) {
                  return true;
                }
              });
              if (result) {
                Alert.alert(
                  "Warning",
                  "you have already applied for leave \n please confirm the previous request first \n contact your manager",
                  [{ text: "OK", onPress: () => navigation.popToTop() }],
                  { cancelable: false }
                );
              } else {
                batch.update(usersRef, {
                  leaves: firebase.firestore.FieldValue.arrayUnion({
                    purpose: values.purpose,
                    address: values.address,
                    email: values.email,
                    contact: values.contact,
                    numOfDays: numberOfDay,
                    approver: manager,
                    leaveType: leave,
                    toDate: toDate,
                    fromDate: fromDate,
                    leaveApprovedByManager: false,
                    leaveApprovedByHR: false,
                    halfLeave: !halfLeave,
                  }),
                });
                batch.set(leaveRef, {
                  leaveRef: db.doc("/LeaveApplied/" + email),
                });

                batch
                  .commit()
                  .then(function () {
                    setModalopen(true);
                  })
                  .catch((err) => {
                    console.log(err);
                    ShowErrorAlert();
                  });
              }
            } else {
              let applyLeave = db.collection("LeaveApplied").doc(email);
              batch.set(applyLeave, {
                leaveId: db.doc("/userLeaveStatus/" + email),
                userId: db.doc("/users/" + email),
                leaves: [
                  {
                    purpose: values.purpose,
                    address: values.address,
                    email: values.email,
                    contact: values.contact,
                    numOfDays: numberOfDay,
                    approver: manager,
                    leaveType: leave,
                    toDate: toDate,
                    fromDate: fromDate,
                    leaveStatus: "pending",
                    halfLeave: !halfLeave,
                  },
                ],
              });

              batch.set(leaveRef, {
                leaveRef: db.doc("/LeaveApplied/" + email),
              });

              batch
                .commit()
                .then(function () {
                  console.log("Written to firestore");
                  setModalopen(true);
                })
                .catch((err) => {
                  console.log(err);
                  errorAlert(err);
                });
            }
          });
        }}
      >
        {(props) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titleHeading}>Pupose :</Text>
            <TextInput
              style={[globalStyles.inputBox, styles.puposeTextInput]}
              multiline={true}
              placeholder={"Pupose"}
              onChangeText={props.handleChange("purpose")}
              value={props.values.purpose}
              onBlur={props.handleBlur("purpose")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.purpose && props.errors.purpose}
            </Text>
            <Text style={styles.titleHeading}>Address :</Text>
            <TextInput
              style={[globalStyles.inputBox, styles.textInput]}
              placeholder={"Address"}
              onChangeText={props.handleChange("address")}
              value={props.values.address}
              onBlur={props.handleBlur("address")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.address && props.errors.address}
            </Text>
            <Text style={styles.titleHeading}>Email :</Text>
            <TextInput
              style={[globalStyles.inputBox, styles.textInput]}
              placeholder={"Email"}
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              onBlur={props.handleBlur("email")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <Text style={styles.titleHeading}>Contact :</Text>
            <TextInput
              style={[globalStyles.inputBox, styles.textInput]}
              placeholder={"Contact"}
              onChangeText={props.handleChange("contact")}
              value={props.values.contact}
              onBlur={props.handleBlur("contact")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.contact && props.errors.contact}
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={props.handleSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
export const styles = StyleSheet.create({
  titleHeading: {
    fontSize: 22,
    fontWeight: "300",
  },
  puposeTextInput: {
    marginTop: 10,
    padding: 40,
    borderColor: "#439dbb",
    textAlign: "left",
  },
  textInput: {
    marginTop: 10,
    padding: 20,
    borderColor: "#439dbb",
  },
  submitButton: {
    marginVertical: 30,
    borderColor: "#fff",
    backgroundColor: "#439dbb",
    borderRadius: 40,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  okayButton: {
    marginVertical: 30,
    borderColor: "#fff",
    backgroundColor: "#439dbb",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
  },
  modalOuterView: {
    backgroundColor: "#000000aa",
    flex: 1,
    justifyContent: "center",
  },
  modalInnerView: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 10,
  },
  alertText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 17,
    color: "black",
    marginHorizontal: 20,
    alignSelf: "center",
  },
});
