import React,{useState} from 'react';
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import { db } from './Enviroment/FirebaseConfig';

export default function App() {
  const [textValue,setTextValue] = useState()
  
const onClickButton = () => {
  db.ref('/user').push({
    textValue
  });
}
  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput} placeholder = 'Enter message here' onChangeText={(val) => {setTextValue(val)} }/>
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
