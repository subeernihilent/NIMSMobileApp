import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';

const screens = {
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            headerShown: false,
        }
    },

    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        },
    },
    Home: {
        screen: Home
    }
}

const LoginStack = createStackNavigator(screens);

export default createAppContainer(LoginStack);