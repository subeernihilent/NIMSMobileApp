import React, { useState,useRef,useEffect} from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  View,
  TextInput,
  Keyboard,
  Alert,
  Button
} from "react-native";
import { globalStyles } from "../GlobalStyle/GlobalStyles";
import CustomButtonRole from "./CustomButtonRole";
import CustomButtonRegister from "./CustomButtonRegister";
import RoleList from "../Screens/RoleList";
import { Formik } from "formik";
import * as yup from "yup";
import { db } from "../Enviroment/FirebaseConfig";

const reviewSchema = yup.object({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(2, "Seems a bit short...")
    .max(10, "We prefer insecure system, try a shorter password."),
  confirmPassword: yup
    .string()
    .label("Confirm password")
    .required()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const ShowErrorAlert = (error) =>{
  if (error == "Role") {
    Alert.alert(
      "Error",
      "Please select the Role",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }else {
    Alert.alert(
      "Error",
      "Something went wrong please try again later",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

}
 

export default function FormComponent({ navigation }) {
  const [modalState, setModalValue] = useState(false);
  const [role, setRole] = useState("Role");
  const [isLoading, setLoading] = useState(false);
  const _isMounted = useRef(true);

  const handleRegistration = (values, resetForm) => {
    
    setLoading(true);
    let emailId = values.firstName + "." + values.lastName + "@nihilent.com";
    if (role != "Role") {
      db.collection("users")
        .add({
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          role: role,
          email: emailId,
        })
        .then(function (docRef) {
          if (_isMounted.current) { 
            setLoading(false)
            resetForm();
            console.log("Document written with ID: ", docRef.id);
            navigation.navigate("RegistrationSuccessful", {
              emailId: emailId,
              token: docRef.id,
            });
         }
        })
        .catch(function (error) {
          setLoading(false);
          console.error("Error adding document: ", error);
          ShowErrorAlert;
        });
    } else {
      ShowErrorAlert("Role")
      setLoading(false);
    }
  };


  const showRoleAlert = () => {
    const ShowErrorAlert = () =>
      Alert.alert("Error", "Please select the Role", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
  };
  const reset = (val) => {
    val();
  };

  const onPressRoleChange = (role) => {
    setRole(role);
    setModalValue(false);
  };

  useEffect(() => {
    return () => { // ComponentWillUnmount in Class Component
         setLoading(false)
        _isMounted.current = false;
    }
  }, []);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ ...globalStyles.container, ...styles.container }}>
      <Modal visible={modalState}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <RoleList onPressRole={onPressRoleChange} />
        </TouchableWithoutFeedback>
      </Modal>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={reviewSchema}
        onSubmit={(values, { resetForm }) => {
          setRole("Role");
          handleRegistration(values, resetForm);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Please Enter your First Name"
              onChangeText={props.handleChange("firstName")}
              value={props.values.firstName}
              onBlur={props.handleBlur("firstName")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.firstName && props.errors.firstName}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Please Enter your Last Name"
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
              onBlur={props.handleBlur("lastName")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.lastName && props.errors.lastName}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Please Enter your Password"
              secureTextEntry
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
              blurOnSubmit={false}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Please confirm password"
              secureTextEntry
              onChangeText={props.handleChange("confirmPassword")}
              value={props.values.confirmPassword}
              onBlur={props.handleBlur("confirmPassword")}
              blurOnSubmit={false}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.confirmPassword && props.errors.confirmPassword}
            </Text>

            <CustomButtonRole onPress={() => setModalValue(true)} role={role} />
            <CustomButtonRegister
              navigation={navigation}
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

export const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 15,
    fontSize: 14,
    backgroundColor: "white",
  },
  container: {
    marginTop: 20,
  },
});
