import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenNames from '../constants/ScreenNames';
import HomeScreen from '../pages/HomeScreen';
import LoginScreen from '../pages/LoginScreen';
import SplashScreen from '../pages/SplashScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Splash}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenNames.Splash} component={SplashScreen} />
      <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
      <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
}
