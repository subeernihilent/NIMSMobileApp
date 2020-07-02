import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ApproverDropdown from '../Components/ApproverDropdown';
import WeekdayButton from '../Components/WeekdayButton';
import useNavigateLock from "../Hooks/Lock";
import { db } from "../Enviroment/FirebaseConfig";
import { globalStyles } from '../styles/global';
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}


export default function Timesheet({ navigation }) {
    const lock = useNavigateLock();

    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('');

    const [dateList, setDateList] = useState([]);
    const [dateModal, setDateModal] = useState(false);
    const [dateName, setDateName] = useState("");

    const [managerName, setManagerList] = useState([]);
    const [approverModal, setApproverModal] = useState(false);
    const [approverName, setApproverName] = useState("Select");
    let userEmail;

    const showAlert = (msg) => {
        Alert.alert(
            "", msg,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    }

    const navigateToNextScreen = () => {
        if (dateName != "" && approverName != "Select") {
            lock() && navigation.push('TimesheetSecondScreen', {
                location: location,
                dateName: dateName,
                approverName: approverName,
            });
            setDateName("");
        }
        else {
            showAlert("Please select date and approvername");
        }
    }

    const onDateSelected = (dateName) => {
        setDateName(dateName);
        setDateModal(false);
    }

    const onApproverSelected = (approverName) => {
        setApproverName(approverName);
        setApproverModal(false);
    }

    useEffect(() => {
        setTimeout(async () => {
            userEmail = null;
            try {
                userEmail = await AsyncStorage.getItem("userToken");
            } catch (error) {
                console.log(error);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const subscriber = db
                .collection('users')
                .where("email", "==", userEmail)
                .get()
                .then(function (querySnapshot) {
                    console.log("user data", querySnapshot)
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach(documentSnapshot => {
                            setLocation(documentSnapshot.data().location);
                            setManagerList(documentSnapshot.data().managers);
                        });
                    }
                    else {
                        showAlert("No such document");
                    }
                })
                .catch(function (error) {
                    showAlert(error);
                });
            setLoading(false);

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const subscriber = db
                .collection('Week')
                .where("email", "==", userEmail)
                .get()
                .then(function (querySnapshot) {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach(documentSnapshot => {
                            setDateList(documentSnapshot.data().weekdays);
                            console.log("date", '=>', documentSnapshot.data().weekdays);
                        });
                    } else {
                        showAlert("No such document");
                    }
                })
                .catch(function (error) {
                    showAlert(error);
                });
            setLoading(false);

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        }, 2000);
    }, []);


    if (loading) {
        return <ActivityIndicator size='large' style={styles.activityIndicator} />
    }

    return (
        <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.branchView}>
                <Text style={styles.text}>Branch: </Text>
                <Text style={styles.text}>{location}</Text>
            </View>

            <View style={styles.dayView}>
                <TouchableOpacity onPress={() => setDateModal(true)}>
                    <AntDesign name="calendar" size={54} color="black" />
                </TouchableOpacity>
                <Text style={styles.dayText}>{dateName}</Text>
            </View>
            <WeekdayButton dateList={dateList} modalVisibility={dateModal} onPress={onDateSelected} />

            <Text style={styles.approverText}>Approver Name</Text>
            <TouchableOpacity style={globalStyles.dropdownStyle} onPress={() => setApproverModal(true)}>
                <Text>{approverName}</Text>
                <Entypo name="select-arrows" size={24} color="grey" />
            </TouchableOpacity>
            <ApproverDropdown managerName={managerName} modalVisibility={approverModal} onPress={onApproverSelected} />

            <TouchableOpacity style={styles.nextButton} onPress={navigateToNextScreen}>
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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
    dayView: {
        alignItems: 'center',
        margin: 30,
    },
    dayText: {
        fontSize: 18,
        margin: 10,
    },

})