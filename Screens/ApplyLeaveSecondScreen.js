import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
  purpose: yup.string().required().min(3),
  address: yup.string().required().min(3),
  email: yup.string().email().required(),
  contact: yup.string().required().min(10)
});

export default function ApplyLeaveSecondScreen() {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          purpose: "",
          address: "",
          email: "",
          contact: "",
        }}
        validationSchema={reviewSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("submit successful");
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
  submitText: {
    color: "#fff",
    fontSize: 18,
  },
});
