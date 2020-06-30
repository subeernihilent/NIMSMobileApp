import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Modal,FlatList} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function SelectManagerButton({managerList,selection,manager}) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleSelectManager = (manager) => {
    selection(manager)
    setModalOpen(false)
  }

  return (
    <View>
      <Text style={styles.typeText}>Approver :</Text>
      <TouchableOpacity
        style={styles.leaveType}
        onPress={() => setModalOpen(true)}
      >
        <Text style={styles.selectText}>{manager}</Text>
        <Entypo name="select-arrows" size={24} color="grey" />
      </TouchableOpacity>

      <Modal visible={modalOpen} animationType="fade" transparent={true}>
        <View style={styles.modalOuterView}>
          <View style={styles.modalInnerView}>
            <FlatList
              keyExtractor={(managerList,index) => 'key'+index}
              data={managerList}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectManager(item) }>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
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

         modalOuterView: {
           backgroundColor: "#000000aa",
           flex: 1,
           justifyContent: "center",
         },
         modalInnerView: {
           backgroundColor: "#ffffff",
           margin: 20,
           padding: 10,
         },
         text: {
           marginVertical: 5,
           fontSize: 17,
         },
       });
