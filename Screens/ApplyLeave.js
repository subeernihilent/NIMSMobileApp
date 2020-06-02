import React, {useState} from 'react';
import { Text,View,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import { globalStyles } from '../styles/global';
import LeaveStaus from '../Components/LeaveComponents/LeaveStatus'
import { Entypo } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 




export default function ApplyLeave({navigation}){

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
    return (
      <View style={globalStyles.container}>
        <ScrollView showsVerticalScrollIndicator = {false}>
          <LeaveStaus />
          <View>
            <Text style={styles.typeText}>Leave Type :</Text>
            <TouchableOpacity style={styles.leaveType}>
              <Text style={styles.selectText}>Sick</Text>
              <Entypo name="select-arrows" size={24} color="grey" />
            </TouchableOpacity>
            <Text style={styles.typeText}>Approver :</Text>
            <TouchableOpacity style={styles.leaveType}>
              <Text style={styles.selectText}>Ashok Thube</Text>
              <Entypo name="select-arrows" size={24} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={styles.checkBoxContainer}>
            <Text style={styles.typeText}>From Date :</Text>
            <View style={styles.checkBoxContainer}>
              <Text style={{ color: "green" }}>Half leave</Text>
              <CheckBox
                onClick={() => setToggleCheckBox(!toggleCheckBox)}
                isChecked={toggleCheckBox}
                checkBoxColor="green"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.fromDateContainer}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text style={styles.fromDateText}>28th May 2020</Text>
          </TouchableOpacity>
          <View style={styles.checkBoxContainer}>
            <Text style={styles.typeText}>To Date :</Text>
          </View>
          <TouchableOpacity style={styles.fromDateContainer}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text style={styles.fromDateText}>31th May 2020</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.push('ApplyLeaveSecondScreen')}>
          <MaterialIcons  name="navigate-next" size={44} color="black" />
          </TouchableOpacity>


        </ScrollView>
      </View>
    );
}

export const styles = StyleSheet.create({
  typeText:{
    fontSize:22,
    marginVertical:20,
    
  },
  leaveType:{
    borderWidth:1,
    padding:15,
    borderColor:'black',
    borderRadius:8,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  selectText:{
    color:'grey',
  },
  checkBoxContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },  

  fromDateContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center', 
  },

  fromDateText:{
    fontSize:22,
    fontWeight:'300',
    marginLeft:10
  },

  nextButton:{
    marginTop:50,
    borderColor:'#439dbb',
    borderRadius:50,
    borderWidth:1,
    width:100,
    height:100,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'flex-end',
  }

})
