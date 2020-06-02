import React, {useState} from 'react';
import {  StyleSheet, Text,FlatList ,TouchableOpacity,View,Image} from 'react-native';
import { globalStyles } from '../styles/global';
import { AuthContext } from "../Context/AuthContext";
import useNavigateLock from '../Hooks/Lock'


export default function Home({navigation}){
    const lock = useNavigateLock()
    const goAppleave = () => lock() && navigation.push('ApplyLeave')
    const { logOut } = React.useContext(AuthContext);
    const [menuList,setMenuList] = useState([{ id: 1, value: "Time Sheet", image:  require('../assets/timeSheet.png')},
    { id: 2, value: "Apply Leaves",image:  require('../assets/leave.png') },
   ])

  
    return (
      <View style={globalStyles.container}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={menuList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={goAppleave}>
              <View style={styles.listView}>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.value}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
}

export const styles = StyleSheet.create({

    image: {
        marginTop:50,
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    text: {
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:24,
        color:'black',
    },
    listView: {  
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
      alignItems:'center',
      paddingBottom:20
    }
  
})

