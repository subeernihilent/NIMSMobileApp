import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import useNavigateLock from "../Hooks/Lock";
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from "../Enviroment/FirebaseConfig";
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}


export default function ReviewUserTimesheet({ navigation, route }) {
    const lock = useNavigateLock();
    const [isLoading, setLoading] = useState(true);
    const [userTimesheet, setUserTimesheet] = useState([]);

    const showAlert = (msg) => {
        Alert.alert(
            "", msg,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    }

    const navigateToDetailRequest = (list) => {
        lock() && navigation.push('TimesheetDetailRequest', {
            list: list,
            email: route.params.email
        })
    }

    const getUserTimesheet = async () => {
        try {
            setLoading(true);
            if (route.params.email !== null && route.params.manager !== null) {
                var docRef = db.collection("Managers")
                    .doc(route.params.manager)
                    .collection("Timesheet")
                    .doc(route.params.email);
                docRef.get().then(function (doc) {
                    if (doc.exists) {
                        let userTimesheet = doc.data();
                        if (userTimesheet.timesheetRef) {
                            userTimesheet.timesheetRef.get().then((res) => {
                                let timesheetInfo = res.data();
                                var timesheet = timesheetInfo["timeSheet"];
                                timesheet.forEach((element) => {
                                    if (element.managerApproval === false && element.approverName === route.params.manager) {
                                        setUserTimesheet((oldArray) => [...oldArray, element]);
                                        console.log(element);
                                    }
                                   

                                });
                                setLoading(false);
                            });
                        }
                        else {
                            setLoading(false);
                            showAlert("No such document!");
                        }
                    } else {
                        setLoading(false);
                        showAlert("No such document!");
                    }
                }).catch(function (error) {
                    setLoading(false);
                    showAlert(error.message);
                });
            }
        } catch (e) {
            setLoading(false);
            showAlert("not able to retreive email");
        }
    };

    useEffect(() => {
        getUserTimesheet();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size='large' style={styles.activityIndicator} />
    }

    return (
        <View style={globalStyles.container}>
            <Text style={styles.textstyle}>{route.params.userName}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={userTimesheet}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToDetailRequest(item)}>
                        <View style={styles.detailView}>
                            <Text>{item.weekdate}</Text>
                            <MaterialIcons name="navigate-next" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                )} />

        </View>
    )
}

const styles = StyleSheet.create({
    textstyle: {
        fontSize: 25,
        color: 'black',
    },
    dateStyle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold'
    },
    detailView: {
        borderWidth: 0.5,
        borderColor: 'grey',
        backgroundColor: '#b1d9e7',
        borderRadius: 2,
        padding: 30,
        marginVertical: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailText: {
        fontWeight: 'bold'
    },
    button: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#439dbb',
        borderRadius: 20,
        alignItems: 'center',
        padding: 15,
        margin: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    }

})