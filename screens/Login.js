import { decode, encode } from "base-64";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import React,{useState} from "react";
import { Image, ScrollView, ActivityIndicator,View } from "react-native";
import * as yup from "yup";
import LoginFormComponent from "../Components/LoginFormComponent";
import { db } from "../Enviroment/FirebaseConfig";
import { globalStyles } from "../styles/global";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
import { AuthContext } from "../Context/AuthContext";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});



export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const [isLoading,setLoading] = useState(false)

  const navigateSignIn = (email, token) => {
    signIn(email, token);
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <LinearGradient
      colors={["#3366cc", "#abc7f9", "#f5f5ff", "#ffffff"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={globalStyles.container}
    >
      
      
      <ScrollView>
        <Image
          style={globalStyles.logo}
          source={require("../assets/nims_logo.gif")}
        />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            setLoading(true)
            console.log(values);
            const ref = db
              .collection("users")
              .where("email", "==", values.email)
              .where("password", "==", values.password);

            ref.onSnapshot((querySnapshot) => {
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  console.log("email  :" + doc.data().email);
                  console.log("tokenLogin  :" + doc.id);
                  navigateSignIn(doc.data().email, doc.id);
                  resetForm();
                });
              } else {
                setLoading(false)
                console.log("No such document");
                alert("Invalid email & password");
              }
            });
          }}
        >
          {(props) => <LoginFormComponent props={props} navigation={navigation} />}
        </Formik>
      </ScrollView>
    </LinearGradient>
  );
}
