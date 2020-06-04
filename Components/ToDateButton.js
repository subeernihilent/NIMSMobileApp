import React ,{useState}from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal,Alert} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import {Calendar} from 'react-native-calendars';


export default function ToDate({minimumDate,onPress}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [toDate, setToDate] = useState("To Date");
  
  const alertForSecondDate = () =>{
    Alert.alert(
      "Not allowed",
      "Please select from date first",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }
    
  const handleFromDateValidation = () => {
    if (minimumDate != "From Date") {
      setModalVisible(true);
    }else {
      alertForSecondDate();
    }
    
  }

    return (
      <View >   
        <View style={styles.checkBoxContainer}>
          <Text style={styles.typeText}>To Date :</Text>
        </View>
        <TouchableOpacity style={styles.fromDateContainer} onPress={handleFromDateValidation}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.fromDateText}>{toDate}</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Calendar
            style={styles.calendarView}
            minDate={minimumDate}
            maxDate={"2021-01-01"}
            monthFormat={"MMM yyyy"}
            onDayPress={(day) => {
              setToDate(day.dateString);
              onPress(day.dateString)
              setModalVisible(false)
            }}
          />
        </View>
      </Modal>
        
      </View>
    );
}

export const styles = StyleSheet.create({
    typeText: {
        fontSize: 22,
        marginVertical: 20,
      },
      checkBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      fromDateContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      fromDateText: {
        fontSize: 22,
        fontWeight: "300",
        marginLeft: 10,
      },
      modalView: {
        position: "absolute",
        width: "100%",
        height: "50%",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        borderColor:'black',
        borderRightColor:'black',
        borderRightColor:'black',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderWidth:0,
      },
      calendarView:{
        flex:1,
        width:'100%',
        borderColor:'black',
        borderRightColor:'black',
        borderRightColor:'black',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderWidth:1,
      }
})

