import React ,{useState}from 'react';
import { StyleSheet,Text, View,TouchableOpacity,FlatList} from 'react-native';
import {globalStyles} from '../GlobalStyle/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoleList({onPress} ) {
 const [roleList,setRolelist] = useState([{ id: 1, value: "HR" },
 { id: 2, value: "NSS" },
 { id: 3, value: "ADMIN" },
 { id: 4, value: "FINACE" },
])

    return (
      <LinearGradient
        colors={["#75a5f5", "#abc7f9", "#f5f5ff", "#Fff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >

        
          <FlatList
            keyExtractor={(item) => item.id}
            data={roleList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={onPress}>
                <View style={styles.listView}>
                  <Text style={styles.text}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
      
      </LinearGradient>
    );
}

export const styles = StyleSheet.create({

    container:{
      flex:1,
      paddingTop:100,
      paddingLeft:30,
      paddingRight:30
    },

    text: {
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize:18,
        color:'grey',
        alignSelf:'center'
       
    },
    listView: {
      marginBottom:20,
      borderRadius:10,
      borderWidth:1,
      borderColor:'grey',
      padding: 20,
      fontSize: 14,
      backgroundColor:'white'
    }
  
})

