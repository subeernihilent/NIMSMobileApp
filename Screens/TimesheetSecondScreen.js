import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ProjectDropdown from '../Components/ProjectDropdown';
import SubtaskDropdown from '../Components/SubtaskDropdown';
import TaskDropdown from '../Components/TaskDropdown';
import { globalStyles } from '../styles/global';


export default function TimesheetSecondScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.timeDayView}>
                    <View>
                        <Text style={styles.text}>Day</Text>
                        <TouchableOpacity style={styles.touchableStyle}>
                            <Text style={styles.dateText}>Select date</Text>
                            <AntDesign name="calendar" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.text}>hrs</Text>
                        <TextInput style={styles.timeInputBox}
                            placeholder='Select Time'
                            underlineColorAndroid='transparent'
                            keyboardType='number-pad'
                        />
                    </View>
                </View>

                <Text style={styles.text}>Project Code</Text>
                <ProjectDropdown />

                <Text style={styles.text}>Task Name</Text>
                <TaskDropdown />

                <Text style={styles.text}>Sub Task</Text>
                <SubtaskDropdown />

                <Text style={styles.text}>Remarks</Text>
                <TextInput style={styles.inputBox}
                    placeholder='Remarks'
                    multiline={true}
                    underlineColorAndroid='transparent'
                />

                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.push('TimesheetDetailScreen')}>
                    <MaterialIcons name="navigate-next" size={44} color="black" />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    touchableStyle: {
        borderWidth: 1,
        padding: 15,
        borderColor: '#439dbb',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    dateText: {
        color: 'grey',
        marginRight: 40,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 5,
    },
    timeDayView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timeInputBox: {
        borderRadius: 8,
        borderColor: '#439dbb',
        borderWidth: 1,
        backgroundColor: '#fff',
        padding: 13,
        marginTop: 5,
    },
    inputBox: {
        borderRadius: 8,
        borderColor: '#439dbb',
        borderWidth: 1,
        backgroundColor: '#fff',
        margin: 5,
        padding: 15,
    },
    nextButton: {
        marginTop: 50,
        borderColor: '#439dbb',
        borderRadius: 40,
        borderWidth: 2,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
})