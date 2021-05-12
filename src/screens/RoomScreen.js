import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Messages from '../components/Messages';
import FormInput from '../components/FormInput';

function RoomScreen() {
  const [message, setMessage] = useState('');
  const [responses, setAnswer] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [data, setData] = useState([]);
  const reversedData = data.reverse();

  useEffect(() => {
    fetchQuestions();
    getAnswers();
  }, []);

  useEffect(() => {
    setChatList([...data]);
  }, [data]);

  const giveRandomNumber = Math.floor(Math.random() * responses.length);
  //answer: randomizes answers from responses array
  const answer = responses[giveRandomNumber];

  //fetches all questions from jsonbin.io
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/609bd089e0aabd6e191cea85/latest',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
          },
        },
      );
      const json = await response.json();
      setData(json.record);
    } catch (error) {
      console.error(error);
    }
  };

  //updates current data array with new values;
  const payload = JSON.stringify([...data, {question: message, answer}]);

  const updateQuestionList = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/609bd089e0aabd6e191cea85',
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
      setData(json.record);
    } catch (error) {
      console.log(error);
    }
  };

  //fetches answers array from jsonbin.io
  const getAnswers = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/609bd036e0aabd6e191cea1d',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
          },
        },
      );
      const json = await response.json();
      setAnswer(json.record);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    updateQuestionList();
    setChatList(reversedData);
    setMessage('');
  };

  return (
    <View>
      <FlatList
        style={styles.flatListStyle}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        data={chatList}
        renderItem={({item}) => (
          <Messages question={item.question} answer={item.answer} />
        )}
      />
      <View style={styles.typeMsgContainer}>
        <FormInput
          label="Enter your text here..."
          value={message}
          style={styles.typeMsgBox}
          onChangeText={val => setMessage(val)}
        />
        <TouchableOpacity
          style={[styles.sendBtn, message ? styles.orangeBck : styles.greyBck]}
          disabled={message ? false : true}
          onPress={() => handleSendMessage()}>
          <IconButton icon="send" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  typeMsgContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    bottom: 5,
  },
  flatListStyle: {
    height: '87%',
    bottom: '3%',
  },
  typeMsgBox: {
    borderWidth: 0.8,
    borderColor: 'grey',
    width: '80%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  sendBtn: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  sendTxt: {color: 'white'},
  orangeBck: {
    backgroundColor: '#6646ee',
  },
  greyBck: {
    backgroundColor: 'grey',
  },
});

export default RoomScreen;
