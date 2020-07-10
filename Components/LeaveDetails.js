import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function LeaveDetails({details}) {
  return (
    <View>
      <View style={styles.cardView}>
        <Text style={styles.text}>Leave type: {details.leaveType}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.text}>Number of Days: {details.numOfDays}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.text}>From date: {details.fromDate}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.text}>To date: {details.toDate}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.text}>Purpose: {details.purpose}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.text}>Email: {details.email}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.text}>Contact: {details.contact}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  cardView: {
    borderWidth: 0.5,
    borderColor: "grey",
    backgroundColor: "#d8edf3",
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 17,
    color: "black",
  },
});
