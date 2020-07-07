import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React,{useState,useEffect} from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { DrawerActions } from "@react-navigation/native";
import Async from "../Utils/AsyncKey";
import { AsyncStorage } from "react-native";
import { db } from "../Enviroment/FirebaseConfig";

export default function CustomDrawerContent(props) {
  const { logOut } = React.useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [toggleRequest, setToggleRequest] = useState(false);

  const errorAlert = (message) => {
    Alert.alert(
      "Something went wrong",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const showReviewRequest = async () => {
    try {
      setLoading(true);
      const email = await AsyncStorage.getItem(Async.EMAIL_KEY);
      if (email !== null) {
        var docRef = db.collection("users").doc(email);
        docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let userInfo = doc.data().role;
            if (userInfo == "NSS") {
                setLoading(false);
                setToggleRequest(true)
            }else {
                setLoading(false);
                setToggleRequest(false)
            }
          }else {
            setLoading(false);
            errorAlert("No such document!");
          }
        })
      }
    } catch (e) {
      setLoading(false);
      errorAlert("not able to retrive email");
    }
  };

  useEffect(() => {
    showReviewRequest();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerHeader}>
            <TouchableHighlight
              style={styles.circle}
              onPress={() => alert("Clicked")}
            >
              <Text style={styles.circleText}>SS</Text>
            </TouchableHighlight>

            <View>
              <Text style={styles.title}>Shivani Singh</Text>
              <Text style={styles.role}>Finance</Text>
            </View>
          </View>

          <View style={styles.horizontalLine} />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons name="home" color="#439dbb" size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate("NIMS");
            }}
          />
          {toggleRequest && (
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="calendar-alt" color="#439dbb" size={size} />
              )}
              label="Review Request"
              onPress={() => {
                props.navigation.navigate("reviewRequest");
              }}
            />
          )}

          <DrawerItem
            icon={({ color, size }) => (
              <FontAwesome5 name="lightbulb" color="#439dbb" size={size} />
            )}
            label="About"
            onPress={() => {
              props.navigation.navigate("About");
            }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout"
                color="#439dbb"
                size={size}
              />
            )}
            label="Logout"
            onPress={() => {
              logOut();
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    alignSelf: "center",
  },
  role: {
    fontSize: 14,
    alignSelf: "center",
    color: "#555555",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  circle: {
    backgroundColor: "#8bc8db",
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  circleText: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    fontSize: 25,
    color: "#ffffff",
  },
});
