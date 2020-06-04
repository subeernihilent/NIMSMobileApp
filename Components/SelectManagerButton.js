import React ,{useState}from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { Entypo } from "@expo/vector-icons";

export default function SelectManagerButton( ) {
    return (
      <View >
         <Text style={styles.typeText}>Approver :</Text>
          <TouchableOpacity style={styles.leaveType}>
            <Text style={styles.selectText}>Ashok Thube</Text>
            <Entypo name="select-arrows" size={24} color="grey" />
          </TouchableOpacity>
      </View>
    );
}

export const styles = StyleSheet.create({
    typeText: {
        fontSize: 22,
        marginVertical: 20,
      },
      leaveType: {
        borderWidth: 1,
        padding: 15,
        borderColor: "black",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      selectText: {
        color: "grey",
      },
})

