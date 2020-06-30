import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { db } from "../Enviroment/FirebaseConfig";
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}
export default function TimesheetDetailScreen({ navigation, route }) {
    const [detailList, setDetailList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    let userEmail;

    useEffect(() => {
        setDetailList(route.params.detailList);
        setTimeout(async () => {
            userEmail = null;
            try {
                userEmail = await AsyncStorage.getItem("userToken");
                console.log("userEmail", userEmail);
            } catch (error) {
                consol.log(error);
            }
        }, 2000);
        setLoading(false);
    }, []);

    const onSubmitClick = () => {
        // setLoading(true);
        let batch = db.batch();
        let timesheet = db.collection("Timesheet").doc(userEmail);
        batch.set(timesheet, {
            timeSheet: [{
                approvedBy: route.params.approverName,
                projectCode: route.params.projectName,
                weekDate: route.params.dateName,
                mon: {
                    task: detailList.filter((item) => item.day === 'Mon').map(({ task }) => ({ task })),
                    subtask: detailList.filter((item) => item.day === 'Mon').map(({ subTask }) => ({ subTask })),
                    time: detailList.filter((item) => item.day === 'Mon').map(({ time }) => ({ time })),
                    remark: detailList.filter((item) => item.day === 'Mon').map(({ remark }) => ({ remark }))
                },
                tue: {
                    task: detailList.filter((item) => item.day === 'Tue').map(({ task }) => ({ task })),
                    subtask: detailList.filter((item) => item.day === 'Tue').map(({ subTask }) => ({ subTask })),
                    time: detailList.filter((item) => item.day === 'Tue').map(({ time }) => ({ time })),
                    remark: detailList.filter((item) => item.day === 'Tue').map(({ remark }) => ({ remark }))
                },
                wed: {
                    task: detailList.filter((item) => item.day === 'Wed').map(({ task }) => ({ task })),
                    subtask: detailList.filter((item) => item.day === 'Wed').map(({ subTask }) => ({ subTask })),
                    time: detailList.filter((item) => item.day === 'Wed').map(({ time }) => ({ time })),
                    remark: detailList.filter((item) => item.day === 'Wed').map(({ remark }) => ({ remark }))
                },
                thu: {
                    task: detailList.filter((item) => item.day === 'Thu').map(({ task }) => ({ task })),
                    subtask: detailList.filter((item) => item.day === 'Thu').map(({ subTask }) => ({ subTask })),
                    time: detailList.filter((item) => item.day === 'Thu').map(({ time }) => ({ time })),
                    remark: detailList.filter((item) => item.day === 'Thu').map(({ remark }) => ({ remark }))
                },
                fri: {
                    task: detailList.filter((item) => item.day === 'Fri').map(({ task }) => ({ task })),
                    subtask: detailList.filter((item) => item.day === 'Fri').map(({ subTask }) => ({ subTask })),
                    time: detailList.filter((item) => item.day === 'Fri').map(({ time }) => ({ time })),
                    remark: detailList.filter((item) => item.day === 'Fri').map(({ remark }) => ({ remark }))
                },
            }]
        }, { merge: true });

        let week = db.collection("Week")
            .where("weekdays", "array-contains", [{ status: false, week: route.params.dateName }])
            .get();

        batch.update(week, {
            weekdays: [{ status: true, week: route.params.dateName }]

        })

        batch.commit()
            .then(function () {
                console.log("Written to firestore");
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                // ShowErrorAlert()
            });
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