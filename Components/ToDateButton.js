import React ,{useState}from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import {Calendar} from 'react-native-calendars';


export default function ToDate( ) {
  const [modalVisible, setModalVisible] = useState(false);
  const [toDate, setToDate] = useState("to Date");
  const [fromDate, setFromDate] = useState("From Date");
    return (
      <View >
           
        <View style={styles.checkBoxContainer}>
          <Text style={styles.typeText}>To Date :</Text>
        </View>
        <TouchableOpacity style={styles.fromDateContainer} onPress={() => setModalVisible(true)}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.fromDateText}>31th May 2020</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Calendar
            style={styles.calendarView}
            minDate={"2020-01-01"}
            maxDate={"2021-01-01"}
            monthFormat={"MMM yyyy"}
            onDayPress={(day) => {
              console.log("selected day", day.dateString);
              setFromDate(day.dateString);
              setToDate("to Date");
              setModalVisible(false)
             // setShow2(false);
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

