import * as React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Button,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Nav from './App/Screens/navigation/navigation';
import SignUp from './App/Screens/sign_up/signup';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogIn from './App/Screens/login/login';
import VideoPlayer from './App/Screens/navigation/search_page/video_player';
import SearchPage from './App/Screens/navigation/search_page/search_page';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn" headerMode="none">
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Navigation" component={Nav} />
          <Stack.Screen name="Search" component={SearchPage} />
          <Stack.Screen name="Video" component={VideoPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
