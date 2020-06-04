import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import { AuthContext } from "../Context/AuthContext";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


export default function TimesheetDetailScreen({ navigation }) {

    const [detailList, setDetailList] = useState([{ id: 1, day: "Mon", time: "8hr", task: "Development", subTask: "coding", remarks: "jjaskaskaklmxnzxnn" },
    { id: 2, day: "Tue", time: "8hr", task: "Design", subTask: "SAS", remarks: "done with mokups" },
    { id: 3, day: "Wed", time: "8hr", task: "Design", subTask: "SAS", remarks: "dnxbbx  bbdw" },
    { id: 4, day: "Thu", time: "8hr", task: "Design", subTask: "SAS", remarks: "done with mokups" },
    { id: 5, day: "Fri", time: "8hr", task: "Design", subTask: "SAS", remarks: "done with mokups" },
    ])

    return (
        <View style={styles.container}>
            <View style={styles.calendarView}>
                <Text style={styles.text}>May 31,2020</Text>
                <Text style={styles.text}>40 hr</Text>
            </View>

             <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={detailList}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.push('TimesheetSecondScreen')}>
                            <View style={styles.detailView}>
                                <Text>{item.day}</Text>
                                <View style={styles.view}>
                                    <Text>{item.task}</Text>
                                    <Text>{item.subTask}</Text>
                                    <Text>{item.remarks}</Text>
                                </View>
                                <Text>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            
          <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    calendarView: {
        backgroundColor: '#b1d9e7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    detailView: {
        borderWidth: 0.5,
        borderColor: 'grey',
        backgroundColor: '#b1d9e7',
        borderRadius: 6,
        padding: 20,
        margin: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#439dbb',
        borderRadius: 20,
        alignItems: 'center',
        padding: 15,
        margin:15,
       },
    buttonText: {
        color: '#ffffff',
        fontSize: 18
    },
})