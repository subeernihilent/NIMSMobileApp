import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';


export default function Welcome({ navigation }) {

    const onLoginClick = () => {
        navigation.navigate('Login');
    }

    const onSignUpClick = () => {
        navigation.navigate('Register');
    }

    return (
        <LinearGradient colors={['#3366cc', '#abc7f9', '#f5f5ff', '#ffffff']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.container}>

            <Image style={globalStyles.logo} source={require('../assets/nims_logo.gif')} />

            <View style={styles.btnContainer}>

              <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onLoginClick} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onSignUpClick} >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        marginVertical: 120
    },
    button: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        padding: 12,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
    },
    buttonText: {
        color: '#0080ff',
    }
})