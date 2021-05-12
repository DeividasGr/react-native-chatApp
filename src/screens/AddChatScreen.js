import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

function AddRoomScreen({navigation}) {
  const [chatName, setChatName] = useState('');
  const [chatList, setChatList] = useState([]);

  const id = () => {
    return Math.floor(Math.random() * 99999);
  };

  const fetchList = useCallback(() => {
    getChatList();
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const getChatList = async () => {
    try {
      let response = await fetch(
        'https://api.jsonbin.io/v3/b/609bba991a02f86e1f0a612e/latest',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
          },
        },
      );
      let json = await response.json();
      setChatList(json.record);
    } catch (error) {
      console.error(error);
    }
  };

  const payload = JSON.stringify([...chatList, {userName: chatName, id: id()}]);

  const updateChatRoomList = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/609bba991a02f86e1f0a612e',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key':
              '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
          },
          body: payload,
        },
      );
      const json = await response.json();
      setChatList(json.record);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatRoomAddition = () => {
    updateChatRoomList();
    navigation.navigate('Home');
    setChatName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat</Title>
        <FormInput
          labelName="Name your chat"
          value={chatName}
          onChangeText={text => setChatName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="Create"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleChatRoomAddition()}
          disabled={chatName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});

export default AddRoomScreen;
