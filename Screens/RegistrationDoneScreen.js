import React, { useState } from "react";
import { StyleSheet, Text, Alert,BackHandler } from "react-native";
import { globalStyles } from "../GlobalStyle/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import ProceedButton from "../Components/ProceedButton";
import { useBackHandler } from '@react-native-community/hooks'
import { AuthContext } from '../Context/AuthContext';



export default function RegistrationSuccessful({ route, navigation }) {
  const [mount, setMount] = useState(false);
  const { signUp } = React.useContext(AuthContext);
  const { emailId,token } = route.params;
  

  useBackHandler(() => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
   )
   return true;
  })

  

  const navigate = () => {
    console.log("email :"+emailId)
    console.log("token :"+token)
    signUp(emailId,token)
  };

  
  return (
    <LinearGradient
      colors={["#75a5f5", "#abc7f9", "#f5f5ff", "#Fff"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.text}>
        {"Your registration\n has been completed succesfuly!"}
      </Text>
      <Text style={styles.textTwo}>Your Nihilent id is</Text>
      <Text style={styles.textEmail}>{emailId}</Text>
      <ProceedButton onPress={navigate} />
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  textTwo: {
    color: "black",
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
    fontSize: 22,
  },
  textEmail: {
    color: "#3180fa",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
  },
});
