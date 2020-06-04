import { StyleSheet } from 'react-native';


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#fff'
    },
    logo: {
        alignSelf: 'center',
        marginVertical: 50
    },
    inputBox: {
        borderRadius: 8,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        backgroundColor: '#fff',
        margin: 5,
        padding: 15,
    },
    dropdownStyle: {
        marginVertical: 7,
        padding: 3,
        borderWidth: 1,
        borderColor: '#439dbb',
        borderRadius: 10,
    },
    dropdownText: {
        color: 'grey'
    },
})