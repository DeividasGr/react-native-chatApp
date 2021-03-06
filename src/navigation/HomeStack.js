import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RoomScreen from '../screens/RoomScreen';
import AddChatScreen from '../screens/AddChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {IconButton} from 'react-native-paper';
import {AuthContext} from './AuthProvider';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
  const {logout} = useContext(AuthContext);
  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <ChatAppStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color="#fff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="logout-variant"
              size={28}
              color="#ffffff"
              onPress={() => logout()}
            />
          ),
        })}
      />
      <ChatAppStack.Screen
        name="Room"
        component={RoomScreen}
        options={({route}) => ({
          title: route.params.thread.userName,
        })}
      />
      <ChatAppStack.Screen name="Profile" component={ProfileScreen} />
    </ChatAppStack.Navigator>
  );
}

function HomeStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
      <ModalStack.Screen name="AddRoom" component={AddChatScreen} />
    </ModalStack.Navigator>
  );
}

export default HomeStack;
