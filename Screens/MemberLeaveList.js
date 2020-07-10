import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import Async from "../Utils/AsyncKey";
import { AsyncStorage } from "react-native";
import { db } from "../Enviroment/FirebaseConfig";
import useNavigateLock from "../Hooks/Lock";

export default function MemberLeaveList({ navigation }) {
  const lock = useNavigateLock();
  const approveRequest = (email) =>
    lock() &&
    navigation.navigate("approveRequest", {
      email: email,
      manager: manager,
      HR: HR,
      role:role
    });
  const [isLoading, setLoading] = useState(false);
  const [list, setlist] = useState([]);
  const [manager, setManger] = useState("");
  const [HR, setHR] = useState("");
  const [role, setRole] = useState("");


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
        var docRef = db.collection("users").doc(email);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              let userInfo = doc.data();
              let firstName = userInfo["firstName"];
              let lastName = userInfo["lastName"];
              let userName = firstName + " " + lastName;
              let HR = userInfo["HR"];
              let role = userInfo["role"];
              setManger(userName);
              setHR(HR);
              setRole(role);
              if (role == "HR") {
                const snapshot = db
                  .collection("HR")
                  .doc(userName)
                  .collection("Leaves");
                  getListOfEmployee(snapshot)

              } else {
                const snapshot = db
                  .collection("Managers")
                  .doc(userName)
                  .collection("Leaves");
                  getListOfEmployee(snapshot)
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

  const getListOfEmployee = (snapshot) => {
    snapshot.get().then((docSnapshot) => {
      if (docSnapshot.empty) {
        setLoading(false);
        errorAlert("No Pending request!");
      } else {
        docSnapshot.forEach((doc) => {
          var email = doc.id;
          var firstName = email.split(".")[0];
          var lastName = email.split(".")[1];
          var firstChar = firstName.slice(0, 1);
          var lastChar = lastName.slice(0, 1);
          var logo = firstChar + lastChar;
          setlist((oldArray) => [
            ...oldArray,
            { id: doc.id, logo: logo },
          ]);
        });
        setLoading(false);
      }
    });
  }


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
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(index) => "_" + Math.random().toString(36).substr(2, 9)}
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => approveRequest(item.id)}>
            <View style={styles.listView}>
              <View style={styles.logo}>
                <Text>{item.logo}</Text>
              </View>
              <Text style={styles.text}>{item.id}</Text>
              <MaterialIcons name="navigate-next" size={30} color="black" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  listView: {
    borderWidth: 0.5,
    borderColor: "grey",
    backgroundColor: "#d8edf3",
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 17,
    color: "black",
    marginRight: 10,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#94ffa5",
  },
  logoText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 17,
    color: "white",
  },
});
