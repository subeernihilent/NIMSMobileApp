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
   <Registration/>
  );
}

