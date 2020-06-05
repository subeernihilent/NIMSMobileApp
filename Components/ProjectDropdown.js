import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, View, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { AuthContext } from "../Context/AuthContext";
import { Entypo } from '@expo/vector-icons';


export default function ProjectDropdown() {
    const [modalOpen, setModalOpen] = useState(false);
    const [projectName, setProjectName] = useState("Select");

    const [projectList, setProjectList] = useState([{ id: 1, name: "Nedbank" },
    { id: 2, name: "Nihilent Capability" },]);

    onItemSelected = (projectName) => {
        setProjectName(projectName);
        setModalOpen(false);
    }

    return (
        <View>
            <TouchableOpacity style={globalStyles.dropdownStyle} onPress={() => setModalOpen(true)}>
                <Text>{projectName}</Text>
                <Entypo name="select-arrows" size={24} color="grey" />
            </TouchableOpacity>

            <Modal visible={modalOpen} animationType='slide' transparent={true}>
                <View style={styles.modalOuterView}>
                    <View style={styles.modalInnerView}>
                        <FlatList
                            keyExtractor={(item) => item.id.toString()}
                            data={projectList}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => onItemSelected(item.name)}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    modalOuterView: {
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'center'
    },
    modalInnerView: {
        backgroundColor: '#ffffff',
        margin: 20,
        padding: 10,
    },
    text: {
        marginVertical: 5,
        fontSize: 17,
    },

})