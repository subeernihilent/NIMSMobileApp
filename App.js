import React,{useState} from 'react';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import { db } from './Enviroment/FirebaseConfig';
import Registration from './Screens/Registration';



export default function App() {
  const [textValue,setTextValue] = useState()
  
const onClickButton = () => {
 
  db.collection("users").add({
    firstName: "Shivani",
    lastName: "Singh",
    role: "Nss",
    email:"Shivani.Singh@nihilent.com"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});


}
  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput} placeholder = 'Enter message' onChangeText={(val) => {setTextValue(val)} }/>
      <Button title='Submit' onPress={onClickButton}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TextInput: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 5,
    width: 200
  }

});
