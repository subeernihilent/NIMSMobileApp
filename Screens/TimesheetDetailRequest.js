import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from "../Enviroment/FirebaseConfig";
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

export default function TimesheetDetailRequest({ navigation, route }) {
    const [index, setIndex] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const showAlert = (msg) => {
        Alert.alert(
            "", msg,
            [{ text: "OK", onPress: () => navigation.popToTop() }],
            { cancelable: false }
        );
    }

    const onApprovePress = () => {
        setLoading(true);
        try {
            var docRef = db.collection("Timesheet").doc(route.params.email);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    var objects = doc.data().timeSheet;
                    var result = objects.find(function (obj, index) {
                        if (obj.managerApproval === false) {
                            setIndex(index);
                            return obj;
                        }
                    });
                    result.managerApproval = true;
                    objects[index] = result;
                    docRef.update({
                        timeSheet: objects,
                    })
                        .then(function () {
                            setLoading(false);
                            showAlert("Timesheet approved");
                        });
                }
            });
        } catch (e) {
            setLoading(false);
            errorAlert("not able to retreive email");
        }
    };

    if (isLoading) {
        return <ActivityIndicator size='large' style={styles.activityIndicator} />
    }

    return (

        <View style={styles.container}>
            <Text style={styles.dateText}>{route.params.list.weekdate}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.detailView}>
                    <Text style={styles.dayText}>Mon</Text>
                    <Text>{route.params.list.mon.task}</Text>
                    <Text>{route.params.list.mon.remark}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.dayText}>Tue</Text>
                    <Text>{route.params.list.tue.task}</Text>
                    <Text>{route.params.list.tue.remark}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.dayText}>Wed</Text>
                    <Text>{route.params.list.wed.task}</Text>
                    <Text>{route.params.list.wed.remark}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.dayText}>Thu</Text>
                    <Text>{route.params.list.thu.task}</Text>
                    <Text>{route.params.list.thu.remark}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.dayText}>Fri</Text>
                    <Text>{route.params.list.fri.task}</Text>
                    <Text>{route.params.list.fri.remark}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={onApprovePress}>
                <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>

        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detailView: {
        borderWidth: 0.5,
        borderColor: 'grey',
        backgroundColor: '#b1d9e7',
        borderRadius: 6,
        padding: 15,
        margin: 15,
        alignItems: 'center'
    },
    button: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#439dbb',
        borderRadius: 20,
        alignItems: 'center',
        padding: 10,
        margin: 15,
        marginHorizontal: 30,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
    dateText: {
        marginLeft: 15,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
    dayText: {
        fontWeight: 'bold',
    }
})