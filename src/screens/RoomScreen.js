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
  console.log(data);

  useEffect(() => {
    fetchQuestions();
    getAnswers();
  }, []);

  useEffect(() => {
    const initialQuestion = data[0];
    setChatList([
      ...data,
      {
        question: initialQuestion?.question || null,
        answer: initialQuestion?.answer,
      },
    ]);
  }, [data, message]);

  const random = Math.floor(Math.random() * responses.length);
  const answer = responses[random];

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/b/609aea891a02f86e1f09b773',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$9PRj4Srm4jEJgJsV/mhQDeCFqGjCnTp5s848K0rdYzE/mtCMyFamC',
          },
        },
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const payload = JSON.stringify([...data, {question: message, answer}]);

  const updateQuestionList = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/b/609aea891a02f86e1f09b773',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key':
              '$2b$10$9PRj4Srm4jEJgJsV/mhQDeCFqGjCnTp5s848K0rdYzE/mtCMyFamC',
          },
          body: payload,
        },
      );
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnswers = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/b/609aea0c6e36c66e53613564',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$9PRj4Srm4jEJgJsV/mhQDeCFqGjCnTp5s848K0rdYzE/mtCMyFamC',
          },
        },
      );
      const json = await response.json();
      setAnswer(json);
    } catch (error) {
      console.log(error);
    }
  };

  const onSendMessage = () => {
    updateQuestionList();
    setChatList(data.reverse());
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
