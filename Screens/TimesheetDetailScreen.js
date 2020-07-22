import React, { useState, useEffect } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert, } from 'react-native';
import { db } from "../Enviroment/FirebaseConfig";
import firebase from 'firebase';
import 'firebase/firestore'
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}


export default function TimesheetDetailScreen({ navigation, route }) {

    const [detailList, setDetailList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [totalhrs, setTotalhrs] = useState(0);

    const [monTask, setMonTask] = useState('');
    const [monTime, setMonTime] = useState(0);
    const [monSubtask, setMonSubtask] = useState('');
    const [monRemark, setMonRemark] = useState('');

    const [tueTask, setTueTask] = useState('');
    const [tueTime, setTueTime] = useState(0);
    const [tueSubtask, setTueSubtask] = useState('');
    const [tueRemark, setTueRemark] = useState('');

    const [wedTask, setWedTask] = useState('');
    const [wedTime, setWedTime] = useState(0);
    const [wedSubtask, setWedSubtask] = useState('');
    const [wedRemark, setWedRemark] = useState('');

    const [thuTask, setThuTask] = useState('');
    const [thuTime, setThuTime] = useState(0);
    const [thuSubtask, setThuSubtask] = useState('');
    const [thuRemark, setThuRemark] = useState('');

    const [friTask, setFriTask] = useState('');
    const [friTime, setFriTime] = useState(0);
    const [friSubtask, setFriSubtask] = useState('');
    const [friRemark, setFriRemark] = useState('');


    const getData = (detailList) => {
        detailList.filter((item) => {
            if (item.day === 'Mon') {
                setMonTask(item.task);
                setMonSubtask(item.subTask);
                setMonTime(item.time);
                setMonRemark(item.remark);
            }
            else if (item.day === 'Tue') {
                setTueTask(item.task);
                setTueSubtask(item.subTask);
                setTueTime(item.time);
                setTueRemark(item.remark);
            }
            else if (item.day === 'Wed') {
                setWedTask(item.task);
                setWedSubtask(item.subTask);
                setWedTime(item.time);
                setWedRemark(item.remark);
            }
            else if (item.day === 'Thu') {
                setThuTask(item.task);
                setThuSubtask(item.subTask);
                setThuTime(item.time);
                setThuRemark(item.remark);
            }
            else if (item.day === 'Fri') {
                setFriTask(item.task);
                setFriSubtask(item.subTask);
                setFriTime(item.time);
                setFriRemark(item.remark);
            }
        })
    }

    useEffect(() => {
        setDetailList(route.params.detailList);
        setLoading(false);
        getData(route.params.detailList);
    }, [])

    const showAlert = (msg) => {
        Alert.alert(
            "", msg,
            [{ text: "OK", onPress: () => navigation.popToTop() }],
            { cancelable: false }
        );
    }

    const onSubmitClick = async () => {
        getData(detailList);
        console.log("test", tueRemark);
        try {
            setLoading(true);
            const email = await AsyncStorage.getItem("userToken");
            if (email !== null) {
                var timesheetRef = db.collection("Timesheet").doc(email);
                var weekListRef = db.collection("Week").doc(email);
                var managerRef = db.collection("Managers").doc(route.params.approverName)
                    .collection("Timesheet")
                    .doc(email);

                db.runTransaction((transaction) => {
                    return Promise.all([
                        transaction.get(timesheetRef),
                        transaction.get(weekListRef),
                    ]).then((docs) => {
                        let docTimesheet = docs[0];
                        let docWeekList = docs[1];

                        let weekList = docWeekList.data().weekdays;
                        var weekIndex = 0;
                        var result = weekList.find(function (obj, index) {
                            if (obj.week === route.params.dateName) {
                                weekIndex = index;
                                return obj;
                            }
                        });
                        result.status = true;
                        weekList[weekIndex] = result;

                        if (docTimesheet.exists) {
                            transaction.update(timesheetRef, {
                                timeSheet: firebase.firestore.FieldValue.arrayUnion({
                                    approverName: route.params.approverName,
                                    projectName: route.params.projectName,
                                    weekdate: route.params.dateName,
                                    mon: {
                                        task: monTask,
                                        subtask: monSubtask,
                                        remark: monRemark,
                                        time: monTime,
                                    },
                                    tue: {
                                        task: tueTask,
                                        subtask: tueSubtask,
                                        remark: tueRemark,
                                        time: tueTime,
                                    },
                                    wed: {
                                        task: wedTask,
                                        subtask: wedSubtask,
                                        remark: wedRemark,
                                        time: wedTime,
                                    },
                                    thu: {
                                        task: thuTask,
                                        subtask: thuSubtask,
                                        remark: thuRemark,
                                        time: thuTime,
                                    },
                                    fri: {
                                        task: friTask,
                                        subtask: friSubtask,
                                        remark: friRemark,
                                        time: friTime,
                                    },
                                    managerApproval: false,
                                }),
                            });

                            transaction.set(managerRef, {
                                timesheetRef: db.doc("/Timesheet/" + email),
                            });

                            transaction.update(weekListRef, {
                                weekdays: weekList,
                            });
                        }
                        else {
                            transaction.set(timesheetRef, {
                                userId: db.doc("/users/" + email),
                                timeSheet: [{
                                    approverName: route.params.approverName,
                                    projectName: route.params.projectName,
                                    weekdate: route.params.dateName,
                                    mon: {
                                        task: monTask,
                                        subtask: monSubtask,
                                        remark: monRemark,
                                        time: monTime,
                                    },
                                    tue: {
                                        task: tueTask,
                                        subtask: tueSubtask,
                                        remark: tueRemark,
                                        time: tueTime,
                                    },
                                    wed: {
                                        task: wedTask,
                                        subtask: wedSubtask,
                                        remark: wedRemark,
                                        time: wedTime,
                                    },
                                    thu: {
                                        task: thuTask,
                                        subtask: thuSubtask,
                                        remark: thuRemark,
                                        time: thuTime,
                                    },
                                    fri: {
                                        task: friTask,
                                        subtask: friSubtask,
                                        remark: friRemark,
                                        time: friTime,
                                    },
                                    managerApproval: false,
                                }]
                            });

                            transaction.set(managerRef, {
                                timesheetRef: db.doc("/Timesheet/" + email),
                            });

                            transaction.update(weekListRef, {
                                weekdays: weekList,
                            });
                        }
                    })
                })
                    .then(function () {
                        setLoading(false);
                        showAlert("Timesheet submitted successfully!");
                    })
            }

        } catch (error) {
            setLoading(false);
            showAlert(error);

        }
    }

    if (isLoading) {
        return <ActivityIndicator size='large' style={styles.activityIndicator} />
    }

    return (
        <View style={styles.container}>
            <View style={styles.calendarView}>
                <Text style={styles.text}>{route.params.dateName}</Text>
                <Text style={styles.text}>40 hr</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                data={detailList}
                renderItem={({ item }) => (
                    <View style={styles.detailView}>
                        <Text>{item.day}</Text>
                        <View style={styles.view}>
                            <Text>{item.task}</Text>
                            <Text>{item.subTask}</Text>
                            <Text numberOfLines={4}>{item.remark}</Text>
                        </View>
                        <Text>{item.time}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={onSubmitClick}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        margin: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
})