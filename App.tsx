import {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Colors} from './constants/styles';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider, {AuthContext} from './Store/auth-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({tintColor}) => (
            <IconButton icon="log-out-outline" size={25} color={tintColor} onPress={authCtx.logout} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export function Root() {
  const authCtx = useContext(AuthContext)
  useEffect(()=>{
    async function fetchtoken() {
      const storedtoken = await AsyncStorage.getItem('token')
      if (storedtoken) {
        authCtx.authenticate(storedtoken)
      }
    }
    fetchtoken()
  }, [])
 return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}
