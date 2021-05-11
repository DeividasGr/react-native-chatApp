import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

function AddRoomScreen({navigation}) {
  const [chatName, setChatName] = useState('');

  //  const config = {
  //    method: 'POST',
  //    headers: {
  //      'X-Collection-Name': 'THREAD',
  //      'X-Master-Key':
  //        '$2b$10$8RHzIQysv7vAABNOmRgDZe0Hlu8krfvcUql0qPlCBLndTUPh.0F4e',
  //    },
  //  };

  const handleButtonPress = () => {
    try {
      fetch('https://api.jsonbin.io/v3/c/6098dbf61a02f86e1f074167/meta/name', {
        method: 'PUT',
        headers: {
          'X-Master-Key':
            '$2b$10$8RHzIQysv7vAABNOmRgDZe0Hlu8krfvcUql0qPlCBLndTUPh.0F4e',
          'X-Collection-Name': 'THREAD',
        },
      });
    } catch (error) {
      console.log(error);
    }
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
          onPress={handleButtonPress}
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
