import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert, View } from 'react-native';


export default function LoginFormComponent({ props }) {
    return (
        <View>
            <TextInput style={globalStyles.inputBox}
                keyboardType='email-address'
                placeholder='Email Address'
                autoCapitalize='none'
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')} />

            <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>

            <TextInput style={globalStyles.inputBox}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')} />

            <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>


            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={props.handleSubmit} >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        padding: 12,
        marginLeft: 65,
        marginRight: 65,
        marginTop: 10,
    },
    buttonText: {
        color: '#0080ff',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginLeft: 7,
        marginBottom: 5

    }
})