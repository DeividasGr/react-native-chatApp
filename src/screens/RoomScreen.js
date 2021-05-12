import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Messages from '../components/Messages';

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

  const random = Math.floor(Math.random() * responses.length);
  const answer = responses[random];

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

  const onSendMessage = () => {
    updateQuestionList();
    setChatList(reversedData);
    setMessage('');
  };

  return (
    <View>
      <FlatList
        style={{height: '87%', bottom: '3%'}}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        data={chatList}
        renderItem={({item}) => (
          <Messages question={item.question} answer={item.answer} />
        )}
      />
      <View style={styles.typeMsgContainer}>
        <TextInput
          style={styles.typeMsgBox}
          value={message}
          placeholder="Type Here ..."
          onChangeText={val => setMessage(val)}
        />
        <TouchableOpacity
          style={[
            styles.sendBtn,
            {backgroundColor: message ? 'orange' : 'grey'},
          ]}
          disabled={message ? false : true}
          onPress={() => onSendMessage()}>
          <Text style={styles.sendTxt}>send</Text>
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

  typeMsgBox: {
    borderWidth: 0.8,
    borderColor: 'grey',
    padding: 10,
    width: '80%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  sendBtn: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendTxt: {color: 'white'},
});

export default RoomScreen;
