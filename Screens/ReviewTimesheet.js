import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { db } from "../Enviroment/FirebaseConfig";
import useNavigateLock from "../Hooks/Lock";
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}


export default function ReviewTimesheet({ navigation }) {
    const lock = useNavigateLock();
    const [employeeList, setEmployeeList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [manager, setManager] = useState('');

    const showAlert = (msg) => {
        Alert.alert(
            "", msg,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    }

    const navigateToDetail = (email, userName) => {
        lock() && navigation.push('ReviewUserTimesheet', {
            email: email,
            userName: userName,
            manager: manager,
        });
    }
    useEffect(() => {
        getTimesheetList();
    }, [])

    const getTimesheetList = async () => {
        try {
            const email = await AsyncStorage.getItem("userToken");
            if (email !== null) {
                var docRef = db.collection("users").doc(email);
                docRef
                    .get()
                    .then(function (doc) {
                        if (doc.exists) {
                            let firstName = doc.data().firstName;
                            let lastName = doc.data().lastName;
                            let userName = firstName + " " + lastName;
                            setManager(userName);
                            if (manager !== null) {
                                const managerRef = db.collection('Managers')
                                    .doc(manager)
                                    .collection('Timesheet')
                                    .get()
                                    .then(function (querySnapshot) {
                                        if (!querySnapshot.empty) {
                                            const list = [];
                                            querySnapshot.forEach(function (doc) {
                                                var firstName = doc.id.split(".")[0];
                                                var lastName = (doc.id.split(".")[1]).split('@')[0];
                                                var userNameChar = firstName.charAt(0) + lastName.charAt(0);
                                                var userName = firstName + " " + lastName;
                                                list.push({
                                                    email: doc.id,
                                                    userName: userName,
                                                    userNameChar: userNameChar
                                                })
                                            });
                                            setEmployeeList(list);
                                            setLoading(false);
                                        }
                                        else {
                                            setLoading(false);
                                            showAlert("No such document");
                                        }
                                    });
                            }
                        }
                        else {
                            setLoading(false);
                            showAlert("No such document!");
                        }
                    }).catch(function (error) {
                        setLoading(false);
                        console.log("error", error);
                        // showAlert(error);
                    });
            }
        } catch (error) {
            setLoading(false);
            showAlert("not able to retrieve email");
        }
    }

    if (isLoading) {
        return <ActivityIndicator size='large' style={styles.activityIndicator} />
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={employeeList}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToDetail(item.email, item.userName)}>
                        <View style={styles.flatListView}>
                            <View style={styles.circle}>
                                <Text style={styles.circleText}>{item.userNameChar}</Text>
                            </View>

                            <Text style={styles.textName}>{item.userName}</Text>
                            <MaterialIcons name="navigate-next" size={34} color="white" />
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    flatListView: {
        borderWidth: 0.5,
        borderColor: 'grey',
        backgroundColor: '#8bc8db',
        borderRadius: 6,
        elevation: 3,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    listView: {
        flexDirection: 'column',
    },
    textName: {
        fontSize: 15,
        color: 'black',
    },
    dateStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    circle: {
        backgroundColor: '#94ffa5',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderColor: 'grey',
    },
    circleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 18,
        fontSize: 10,
        color: '#000000',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    }
})