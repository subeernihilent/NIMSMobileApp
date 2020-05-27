import React, {useState} from 'react';
import { Text,View} from 'react-native';
import { globalStyles } from '../styles/global';


export default function About(){
    return(
        <View style = {globalStyles.container}>
            <Text>Apply leave</Text>
        </View>
    );
}