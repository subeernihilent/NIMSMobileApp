import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ApproverDropdown from '../Components/ApproverDropdown';
import WeekdayButton from '../Components/WeekdayButton';
import { db } from "../Enviroment/FirebaseConfig";
import useNavigateLock from "../Hooks/Lock";
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
    const [flag, setFlag] = useState(false);

    const [managerName, setManagerList] = useState([]);
    const [approverModal, setApproverModal] = useState(false);
    const [approverName, setApproverName] = useState("Select");

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
            showAlert("Please select date and approver name");
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

    const getDetails = async () => {
        try {
            const email = await AsyncStorage.getItem("userToken");
            if (email !== null) {
                var userRef = db.collection("users").doc(email);
                var weekDaysRef = db.collection('Week').doc(email);

                db.runTransaction((transaction) => {
                    return Promise.all([
                        transaction.get(userRef),
                        transaction.get(weekDaysRef),
                    ]).then((docs) => {
                        let userDoc = docs[0];
                        let weekDoc = docs[1];
                        setLocation(userDoc.data().location);
                        setManagerList(userDoc.data().managers);
                        let lists = weekDoc.data().weekdays;
                        lists.forEach((item) => {
                            if (!item.status) {
                                setDateList(dateList => [item, ...dateList]);
                                setFlag(true);
                            }
                          });
                    })
                })
                    .then(function () {
                        setLoading(false);
                    })

            }
            else {
                setLoading(false);
                showAlert("did not get email");
            }
        } catch (error) {
            setLoading(false);
            showAlert(error);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    const onCalendarClick = () => {
        if (!flag) {
            showAlert("No timesheet pending for submitted");
            setDateModal(false);
        }
        else {
            setDateModal(true);
        }
    }

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
                <TouchableOpacity onPress={onCalendarClick}>
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