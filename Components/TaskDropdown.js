import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TaskDropdown({ taskList, modalClose, onPress }) {
    return (
        <View>
            <Modal visible={modalClose} animationType='slide' transparent={true}>
                <View style={styles.modalOuterView}>
                    <View style={styles.modalInnerView}>
                        <FlatList
                            data={taskList}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => onPress(item.key)}>
                                    <Text style={styles.text}>{item.key}</Text>
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