import React, {useState} from 'react';
import { Text,View,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function StatusButton({navigation}) {
    return (
      <View>
        <TouchableOpacity onPress={navigation}>
          <View style={styles.searchView}>
            <View style={styles.chidlView}>
              <Image
                style={styles.image}
                source={require('../assets/leaveStatus.png')}
              />
              <Text style={styles.text}>Leave Status</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    );
}

export const styles = StyleSheet.create({

    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    text: {
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:22,
        color:'black',
    },
    searchView: {  
      borderWidth:0.5,
      borderColor:'grey',
      backgroundColor:'#d8edf3',
      borderRadius: 6,
      elevation: 3,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
      flexDirection:'row',
      paddingLeft:'30%',
      justifyContent:'space-between',
      alignItems:'center',
      paddingVertical:15,
    },

    chidlView:{
      justifyContent:'center',
      alignItems:'center'
    }

})

