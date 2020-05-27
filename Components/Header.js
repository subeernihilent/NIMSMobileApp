import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

export default function Header({navigation, title}) {

    const menuHandler = () => {
        navigation.openDrawer()
    }

    return (
        <View style={styles.header}> 
        <MaterialIcons name='menu' size={28} onPress={menuHandler} style={styles.icon}/>
             <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '100%' , 
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:50
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 1,
    },
    icon: {
        position: "absolute",
        left:18
    },
});