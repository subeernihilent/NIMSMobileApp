import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { AuthContext } from "../Context/AuthContext";
import { DrawerActions } from '@react-navigation/native';


export default function CustomDrawerContent(props) {

    const { logOut } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <View style={styles.drawerHeader}>

                        <TouchableHighlight style={styles.circle} onPress={() => alert("Clicked")}>
                            <Text style={styles.circleText}>SS</Text>
                        </TouchableHighlight>

                        <View>

                            <Text style={styles.title}>Shivani Singh</Text>
                            <Text style={styles.role}>Finance</Text>

                        </View>
                    </View>

                    <View style={styles.horizontalLine} />

                  <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialIcons
                                name="home"
                                color="#439dbb"
                                size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('NIMS') }}
                         />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <FontAwesome5
                                name="calendar-alt"
                                color="#439dbb"
                                size={size}
                            />
                        )}
                        label="Review Request"
                        onPress={() => {props.navigation.navigate('reviewRequest') }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <FontAwesome5
                                name="lightbulb"
                                color="#439dbb"
                                size={size}
                            />
                        )}
                        label="About"
                        onPress={() => {props.navigation.navigate('About') }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="logout"
                                color="#439dbb"
                                size={size}
                            />
                        )}
                        label="Logout"
                        onPress={() => { logOut()}}
                    />

                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    drawerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        alignSelf: 'center'
    },
    role:{
        fontSize:14,
        alignSelf:'center',
        color:'#555555'
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    circle: {
        backgroundColor: '#8bc8db',
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    circleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
        fontSize: 25,
        color: '#ffffff',
    }
})