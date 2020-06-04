import React ,{useState, useEffect,useLayoutEffect}from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal, FlatList,Dimensions} from 'react-native';
import { Entypo } from "@expo/vector-icons";




export default function LeaveTypeButton( ) {
    const [modalVisible, setModalVisible] = useState(false);
    let deviceHeight = Dimensions.get('window').height
    const[leave,setLeave] = useState('Select Leave')
    const[firstCall,setFirstcall] = useState('true')
    const[leaveType,setLeaveType] = useState([{ id: 1, value: "Sick" },
    { id: 2, value: "Casual" },
    { id: 3, value: "Privilege"},
   ])

   const leaveHandle = (value) => {
    setLeave(value)
    setModalVisible(false)
   }

   useLayoutEffect(() => {
     if (firstCall) {
            
     }
   });

    return (
      <View>
        <Text style={styles.typeText}>Leave Type :</Text>
        <TouchableOpacity
          style={styles.leaveType}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectText}>{leave}</Text>
          <Entypo name="select-arrows" size={24} color="grey" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View
            style={[styles.modalView, { marginTop: deviceHeight / 2 - 100 }]}
          >
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={leaveType}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => leaveHandle(item.value)}>
                  <Text style={styles.leaveText}>{item.value}</Text>
                </TouchableOpacity>
              )}
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
      modalView: {
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,  
        marginHorizontal: 50,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
      },
      leaveText: {
          margin:10,
          fontSize:22,
          color:'black',
          fontWeight:'300'
      },
      modalContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
