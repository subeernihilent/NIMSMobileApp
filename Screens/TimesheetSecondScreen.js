import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ProjectDropdown from '../Components/ProjectDropdown';
import SubtaskDropdown from '../Components/SubtaskDropdown';
import TaskDropdown from '../Components/TaskDropdown';
import { db } from "../Enviroment/FirebaseConfig";
import { globalStyles } from '../styles/global';
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

export default function TimesheetSecondScreen({ navigation, route }) {
    const { location, dateName, approverName } = route.params;
    const [time, setTime] = useState('0');

    const [modalOpen, setModalOpen] = useState(false);
    const [dayName, setDayName] = useState("Select day");
    const [dayList, setDayList] = useState([{ id: 1, day: "Sun" }, { id: 2, day: "Mon" },
    { id: 3, day: "Tue" }, { id: 4, day: "Wed" },
    { id: 5, day: "Thu" }, { id: 6, day: "Fri" }, { id: 7, day: "Sat" }]);

    const [remark, setRemark] = useState("");

    const [loading, setLoading] = useState(true);
    const [projectList, setProjectList] = useState([]);
    const [projectModal, setProjectModal] = useState(false);
    const [projectName, setProjectName] = useState("Select");

    const [taskModal, setTaskModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [taskName, setTaskName] = useState("Select");

    const [subTaskList, setSubTaskList] = useState([]);
    const [subtaskName, setSubtaskName] = useState("Select");
    const [subTaskModal, setSubTaskModal] = useState(false);

    const [detailList, setDetailList] = useState([]);
    const [count, setCount] = useState(0);

    const getData = (dayName, taskName, subtaskName, time, remark, location, approverName, dateName) => {
        setDetailList([
            {
                day: dayName, time: time, task: taskName, subTask: subtaskName, remark: remark, id: Math.random().toString()
            }, ...detailList,])
    }

    const showAlert = (msg) => {
        Alert.alert(
            "", msg,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    }

    const onDaySelected = (dayName) => {
        setDayName(dayName);
        setModalOpen(false);
    }

    const onProjectSelected = (projectName) => {
        setProjectName(projectName);
        setProjectModal(false);
    }

    const onTaskSelected = (taskName) => {
        setTaskName(taskName);
        setSubtaskName("Select");
        taskList.filter(item => {
            if (item.key === taskName) {
                setSubTaskList(item.subTask);
            }
        });
        setTaskModal(false);
    }

    const onSubtaskSelected = (subtaskName) => {
        setSubtaskName(subtaskName);
        setSubTaskModal(false);
    }

    const onSubTaskClicked = () => {
        if (taskName != "Select") {
            setSubTaskModal(true)
        }
        else {
            showAlert("Please select task first")
        }
    }

    const navigateToNextScreen = () => {
      if (dayName == "Sun" || dayName == "Sat") {
            showAlert("Please select working day");
        }
        else if (dayName != "Select day" && projectName != "Select" && taskName != "Select" && subtaskName != "Select" && time != '0' && remark != "") {
            if (count <= 4) {
                getData(dayName, taskName, subtaskName, time, remark);
                showAlert("Timesheet added", dayName);
            }
            else {
                navigation.push('TimesheetDetailScreen', {
                    detailList: detailList,
                    location: location,
                    dateName: dateName,
                    approverName: approverName,
                    projectName: projectName,
                });
            }
            setCount(count + 1);

            // setDayName("Select day");
            setTaskName("Select");
            setSubtaskName("Select");
            // setProjectName("Select");
            setTime('0');
            setRemark("");
        }
        else if (time != 8) {
            showAlert("Set time is 8");
        }
        else {
            showAlert("Please fill all fields");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            const subscriber = db
                .collection('Projects')
                .get()
                .then(function (querySnapshot) {
                    if (!querySnapshot.empty) {
                        const list = [];
                        querySnapshot.forEach(documentSnapshot => {
                            list.push({
                                key: documentSnapshot.id
                            })
                        });
                        setProjectList(list)
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
                .collection('Task')
                .get()
                .then(function (querySnapshot) {
                    if (!querySnapshot.empty) {
                        const list = [];
                        querySnapshot.forEach(documentSnapshot => {
                            list.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                            });
                        });
                        setTaskList(list);
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

    if (loading) {
        return <ActivityIndicator size='large' style={styles.activityIndicator} />
    }

    return (
        <View style={globalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.timeDayView}>
                    <View>
                        <Text style={styles.text}>Day</Text>
                        <TouchableOpacity style={styles.touchableStyle} onPress={() => setModalOpen(true)}>
                            <Text style={styles.dateText}>{dayName}</Text>
                            <AntDesign name="calendar" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Modal visible={modalOpen} animationType='slide' transparent={true}>
                        <View style={styles.modalOuterView}>
                            <View style={styles.modalInnerView}>
                                <FlatList
                                    keyExtractor={(item) => item.id.toString()}
                                    data={dayList}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => onDaySelected(item.day)}>
                                            <Text style={styles.dayText}>{item.day}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>

                    </Modal>

                    <View>
                        <Text style={styles.text}>hrs</Text>
                        <TextInput style={styles.timeInputBox}
                            placeholder='Select Time'
                            underlineColorAndroid='transparent'
                            keyboardType='number-pad'
                            multiline={false}
                            onChangeText={(time) => setTime(time)}
                            value={time}
                        />
                    </View>
                </View>

                <Text style={styles.text}>Project Code</Text>
                <TouchableOpacity style={globalStyles.dropdownStyle} onPress={() => setProjectModal(true)}>
                    <Text>{projectName}</Text>
                    <Entypo name="select-arrows" size={24} color="grey" />
                </TouchableOpacity>
                <ProjectDropdown projectList={projectList} modalClose={projectModal} onPress={onProjectSelected} />

                <Text style={styles.text}>Task Name</Text>
                <TouchableOpacity style={globalStyles.dropdownStyle} onPress={() => setTaskModal(true)}>
                    <Text>{taskName}</Text>
                    <Entypo name="select-arrows" size={24} color="grey" />
                </TouchableOpacity>
                <TaskDropdown taskList={taskList} modalClose={taskModal} onPress={onTaskSelected} />

                <Text style={styles.text}>Sub Task</Text>
                <TouchableOpacity style={globalStyles.dropdownStyle} onPress={onSubTaskClicked}>
                    <Text>{subtaskName}</Text>
                    <Entypo name="select-arrows" size={24} color="grey" />
                </TouchableOpacity>
                <SubtaskDropdown subTaskList={subTaskList} modalClose={subTaskModal} onPress={onSubtaskSelected} />

                <Text style={styles.text}>Remarks</Text>
                <TextInput style={styles.inputBox}
                    placeholder='Remarks'
                    multiline={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(remark) => setRemark(remark)}
                    value={remark}
                />

                <TouchableOpacity style={styles.nextButton} onPress={navigateToNextScreen}>
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
    modalOuterView: {
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'center'
    },
    modalInnerView: {
        backgroundColor: '#ffffff',
        margin: 15,
        padding: 12,
    },
    dayText: {
        marginVertical: 3,
        fontSize: 17,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    }
})