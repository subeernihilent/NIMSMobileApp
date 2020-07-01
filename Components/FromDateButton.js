import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import CheckBox from "react-native-check-box";
import { AntDesign } from "@expo/vector-icons";
import {Calendar} from 'react-native-calendars';

export default function FromDate({onPress,getHalfLeave}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState("From Date");

  const onClickCheckBox = () => {
    setToggleCheckBox(!toggleCheckBox)
    getHalfLeave(toggleCheckBox)
    
  }

  
  return (
    <View>
      <View style={styles.checkBoxContainer}>
        <Text style={styles.typeText}>From Date :</Text>
        <View style={styles.checkBoxContainer}>
          <Text style={{ color: "green" }}>Half leave</Text>
          <CheckBox
            onClick={onClickCheckBox}
            isChecked={toggleCheckBox}
            checkBoxColor="green"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.fromDateContainer}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="calendar" size={24} color="black" />
        <Text style={styles.fromDateText}>{fromDate}</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Calendar
            style={styles.calendarView}
            minDate={"2020-01-01"}
            maxDate={"2021-01-01"}
            monthFormat={"MMM yyyy"}
            onDayPress={(day) => {
              setFromDate(day.dateString);
              onPress(day.dateString);
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeText: {
    fontSize: 22,
    marginVertical: 20,
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
});
