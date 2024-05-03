/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,

} from 'react-native';
import HomeScreen from './src/screens/home/user';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import DetailScreen from './src/screens/home/detail';
import ListCheckScreen from './src/screens/home/listCheck';
import { RecoilRoot } from 'recoil';
import LoginScreen from './src/screens/home/login';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"LoginScreen"}
      screenOptions={{ headerShown: false }}
    >

      {/* <Stack.Screen
        name={Constants.Navigator.Navbar.value}
        component={BottomMenu}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
      <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
      <Stack.Screen name={"ListCheckScreen"} component={ListCheckScreen} />
      <Stack.Screen name={"DetailScreen"} component={DetailScreen} />

    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {


  return (
    <RecoilRoot>
      <NavigationContainer>
        <PaperProvider>
          <StackNavigator />
        </PaperProvider>
      </NavigationContainer>
    </RecoilRoot >

  );
}


export default App;
