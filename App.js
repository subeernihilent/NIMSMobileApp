import { decode, encode } from 'base-64';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { db } from './Enviroment/FirebaseConfig';



export default function App() {
  
 const onClickButton = () => {

 const ref=db.collection("users")
    ref.onSnapshot(querySnapshot=>{
     
      querySnapshot.forEach(doc=>{
       
        const{firstName,lastName,password,role,email}=doc.data();
        // console.log(firstName,lastName,password,email,role);

       
        
        })
    })


  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput} placeholder='Enter message' onChangeText={(val) => { setTextValue(val) }} />
      <Button title='Submit' onPress={onClickButton} />
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
