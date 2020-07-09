import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function SubtaskDropdown({ subTaskList, modalClose, onPress }) {
    return (
        <View>
            <Modal visible={modalClose} animationType='fade' transparent={true}>
                <View style={styles.modalOuterView}>
                    <View style={styles.modalInnerView}>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={subTaskList}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => onPress(item)}>
                                    <Text style={styles.text}>{item}</Text>
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