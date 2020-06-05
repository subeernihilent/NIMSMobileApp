import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ApproverDropdown from '../Components/ApproverDropdown';
import { globalStyles } from '../styles/global';


export default function Timesheet({ navigation }) {
    return (
        <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.branchView}>
                <Text style={styles.text}>Branch: </Text>
                <Text style={styles.text}>Pune</Text>
            </View>

            <View style={styles.dayView}>
                <TouchableOpacity>
                    <AntDesign name="calendar" size={54} color="black" />
                </TouchableOpacity>
                <Text style={styles.dayText}>Sunday 31 May 2020 </Text>
            </View>

            <Text style={styles.approverText}>Approver Name</Text>
            <ApproverDropdown />

            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.push('TimesheetSecondScreen')}>
                <MaterialIcons name="navigate-next" size={44} color="black" />
            </TouchableOpacity>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    branchView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontWeight: '500',
        fontSize: 20,
    },
    dayView: {
        alignItems: 'center',
        margin: 30,
    },
    dayText: {
        fontSize: 18,
        margin: 10,
    },
    approverText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 10
    },
    nextButton: {
        marginTop: 100,
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