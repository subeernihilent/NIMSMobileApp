import React ,{useState}from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import useNavigateLock from '../Hooks/Lock'



export default function ReviewRequestScreen({navigation} ) {
  const [menuList,setMenuList] = useState([{ id: 1, value: "Time Sheet"},
    { id: 2, value: "Leaves" }])
    const lock = useNavigateLock()

    const goAppleave = () => lock() && navigation.push('memberLeaveList')
    const goTimeSheet = () => lock() && navigation.push('ReviewTimesheet')

    const pressHanlder=(id)=>{
      if(id==1){
        goTimeSheet()
      }
      else{
        goAppleave()
      }
    }

    return (
      <View style={globalStyles.container} >
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={menuList}
          renderItem={({ item }) => (
             <TouchableOpacity onPress = {()=> pressHanlder(item.id)}>
              <View style={styles.listView}>
                <Text style={styles.text}>{item.value}</Text>
                <MaterialIcons name="navigate-next" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
}

export const styles = StyleSheet.create({
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
    paddingVertical:50,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:80
  },
  text: {
    fontStyle:'normal',
    fontWeight:'300',
    fontSize:24,
    color:'black',
}

})

