import React, {useState} from 'react';
import { Button, StyleSheet, Text, ScrollView,Alert ,View} from 'react-native';
import { globalStyles } from '../styles/global';
import { AuthContext } from "../Context/AuthContext";


export default function Home(){
    const { logOut } = React.useContext(AuthContext);

    return(
        <View style= {globalStyles.container}>
            <Text>HomeScreen</Text>
            <Button title="Log out" onPress={()=> {logOut()}}/>
        </View>
    );
}