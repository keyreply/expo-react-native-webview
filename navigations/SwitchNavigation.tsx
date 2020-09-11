import 'react-native-gesture-handler';
import { createSwitchNavigator } from 'react-navigation';
import { Login, Main } from '../screens';

export default createSwitchNavigator({
  Login: {
    screen: Login
  },
  Main: {
    screen: Main
  }
}, {
  initialRouteName: 'Login'
})
