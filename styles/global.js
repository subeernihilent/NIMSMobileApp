import { StyleSheet } from 'react-native';


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        padding: 12,
        borderWidth: 1,
        borderColor: '#439dbb',
        borderRadius: 8,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    dropdownText: {
        color: 'grey'
    },
    errorText: {
        color: 'crimson',
        fontWeight: '500',
        marginBottom: 2,
        marginTop: 2,
        textAlign: 'center',
      }
})