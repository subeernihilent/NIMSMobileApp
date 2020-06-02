import React, { useState } from "react";
import { StyleSheet, Text, View, Image ,FlatList} from "react-native";
import { globalStyles } from "../styles/global";

export default function LeaveStatus() {
  const [menuList, setMenuList] = useState([
    {
      id: 1,
      title: "Total :",
      values: {casual:"6",sick:"6",privilege:"6"},
    },
    {
      id: 2,
      title: "Current Year Leave :",
      values: {casual:"6",sick:"6",privilege:"6"},
    },
    {
      id: 3,
      title: "Leave Taken :",
      values: {casual:"6",sick:"6",privilege:"6"},
    },
    {
      id: 4,
      title: "Leave Applied :",
      values: {casual:"6",sick:"6",privilege:"6"},
    },
    {
      id: 5,
      title: "Available Balance :",
      values: {casual:"6",sick:"6",privilege:"6"},
    },

  ]);

  return (
    <View style={globalStyles.container}>
      <FlatList
        showsVerticalScrollIndicator = {false}
        keyExtractor={(item) => item.id.toString()}
        data={menuList}
        renderItem={({ item }) => (
          <View>
            <View style={[styles.listView,{backgroundColor: item.title == "Total :"?"#94ffa5" : "#d8edf3"}]}>
              <Text style={styles.text}>{item.title}</Text>
              <View style={styles.lineView}></View>
              <View style={styles.leaveView}>
                <View style={styles.itemView}>
                  <Text style={styles.leaveText}>Casual</Text>
                  <Text style={styles.leaveText}>{item.values.casual}</Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.leaveText}>Sick</Text>
                  <Text style={styles.leaveText}>{item.values.sick}</Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.leaveText}>Privilege</Text>
                  <Text style={styles.leaveText}>{item.values.privilege}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  
  text: {
    marginVertical:10,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 22,
    color: "black",
    alignSelf:'flex-start',
    marginLeft:10
  },
  listView: {
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
    marginVertical: 6,
    paddingBottom: 20,
  },

  leaveView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },

  leaveText:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    color: "black",
    marginHorizontal:20
  },
  lineView:{
    width:'70%',
    height:1,
    backgroundColor:'black',
    alignSelf:'flex-start',
    marginLeft:10
  },
  itemView:{
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
  }

});
