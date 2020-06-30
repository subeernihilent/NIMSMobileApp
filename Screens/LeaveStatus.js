import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator ,FlatList,Alert} from "react-native";
import { globalStyles } from "../styles/global";
import {db} from '../Enviroment/FirebaseConfig';
import Async from "../Utils/AsyncKey"
import { AsyncStorage } from 'react-native';


export default function LeaveStatus() {
  const [isLoading,setLoading] = useState(false)
  const [list,setList] = useState([])

  const errorAlert = (message) =>{
    Alert.alert(
      "Something went wrong",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  const getLeaveStatus =  async () => {
    try {
      setLoading(true)
      const email = await AsyncStorage.getItem(Async.EMAIL_KEY)
      if(email !== null) {
        var docRef = db.collection("userLeaveStatus").doc(email);
        docRef.get().then(function(doc) {
          if (doc.exists) {
               setLoading(false)
              let userLeaveInfo = doc.data();
              let userLeaveArray = userLeaveInfo["Leaves"]    
              userLeaveArray.forEach(element =>
                setList(oldArray => [...oldArray,element])
              );             
    
          } else {
              setLoading(false)
              errorAlert("No such document!");
          }
      }).catch(function(error) {
           setLoading(false)
           errorAlert(error);
      });
      }
    } catch(e) {
    setLoading(false);
       errorAlert('not able to retrive email');
   }
  }

  useEffect(() => {
    getLeaveStatus();
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
        showsVerticalScrollIndicator = {false}
        keyExtractor={(index) => '_' + Math.random().toString(36).substr(2, 9)}
        data={list}
        renderItem={({ item }) => (
          <View>
            <View style={[styles.listView,{backgroundColor: item.title == "Total :"?"#94ffa5" : "#d8edf3"}]}>
              <Text style={styles.text}>{item.title}</Text>
              <View style={styles.lineView}></View>
              <View style={styles.leaveView}>
                <View style={styles.itemView}>
                  <Text style={styles.leaveText}>Casual</Text>
                  <Text style={styles.leaveText}>{item.values.casual}</Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.leaveText}>Sick</Text>
                  <Text style={styles.leaveText}>{item.values.sick}</Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.leaveText}>Privilege</Text>
                  <Text style={styles.leaveText}>{item.values.privilege}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  
  text: {
    marginVertical:10,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 22,
    color: "black",
    alignSelf:'flex-start',
    marginLeft:10
  },
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
    paddingBottom: 20,
  },

  leaveView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },

  leaveText:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    color: "black",
    marginHorizontal:20
  },
  lineView:{
    width:'70%',
    height:1,
    backgroundColor:'black',
    alignSelf:'flex-start',
    marginLeft:10
  },
  itemView:{
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
  }

});
