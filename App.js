import { decode, encode } from "base-64";
import React, { useEffect } from "react";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
import { View, ActivityIndicator, Button } from "react-native";
import About from "./Screens/About";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./Context/AuthContext";
import LoginStack from "./routes/LoginStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AsyncStorage } from 'react-native';
import HomeStack from './routes/MainStack'
import  CustomDrawerContent from './routes/CustomDrawerContent'
import ReviewStack from './routes/ReviewStack'



export default function App() {
  const Drawer = createDrawerNavigator();

  const initialLoginState = {
    isLoading: true,
    user: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          user: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          user: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, token) => {
        let userToken;
        userToken = null;
        if (token != null) {
          try {
            userToken = token;
            console.log("signin  :" + userToken);
            await AsyncStorage.setItem("userToken", userToken);
          } catch (error) {
            consol.log(error);
          }
        }
        dispatch({ type: "LOGIN", id: email, token: userToken });
      },
      signUp: async (emailId,token) => {
        let userToken;
        userToken = null;
        if (token != null) {
          try {
            userToken = token;
            console.log("SignUp  :" + userToken);
            await AsyncStorage.setItem("userToken", userToken);
          } catch (error) {
            consol.log(error);
          }
        }
        dispatch({ type: "REGISTER", id: emailId, token: userToken });
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (error) {
          consol.log(error);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        console.log("retrive  :" + userToken);
      } catch (error) {
        consol.log(error);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
        {loginState.userToken != null ? (
         <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="NIMS" component={HomeStack} />
            <Drawer.Screen name="reviewRequest" component={ReviewStack} />
            <Drawer.Screen name="About" component={About} />
          </Drawer.Navigator>
        ) : (
          <LoginStack/>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
