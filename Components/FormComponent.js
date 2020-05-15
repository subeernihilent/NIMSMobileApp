import React ,{useState}from 'react';
import { StyleSheet, TouchableWithoutFeedback,Modal, View,TextInput,Keyboard} from 'react-native';
import {globalStyles} from '../GlobalStyle/GlobalStyles';
import CustomButtonRole from '../Components/CustomButtonRole';
import CustomButtonRegister from '../Components/CustomButtonRegister';
import RoleList from "../Screens/RoleList";

export default function FormComponent({navigation}) {
  const [modalState , setModalValue] = useState(false);
  const [role,setRole] = useState('Role');

  const onPress = () => {
    setModalValue(!modalState)
  }

    return (
      <View style={{...globalStyles.container,...styles.container}} >
        <Modal visible={modalState}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <RoleList onPress = {onPress}/>
          </TouchableWithoutFeedback>
        </Modal>

        <TextInput style={styles.textInput} placeholder= 'Please Enter your First Name'/>
        <TextInput style={styles.textInput} placeholder= 'Please Enter your Last Name'/>
        <TextInput style={styles.textInput} placeholder= 'Please Enter your Password'/>
        <TextInput style={styles.textInput} placeholder= 'Please confirm password'/>  
        <CustomButtonRole onPress={onPress}/>    
        <CustomButtonRegister/>   
      </View>
    );
}

export const styles = StyleSheet.create({
 textInput: {
   marginBottom:20,
   borderRadius:10,
   borderWidth:1,
   borderColor:'grey',
   padding: 20,
   fontSize: 14,
   backgroundColor:'white'
 },
 container:{
    marginTop:50,
 },
 
})

