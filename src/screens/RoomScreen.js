import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import Messages from '../components/Messages';
import FormInput from '../components/FormInput';
import useFetch from '../hooks/useFetch';

function RoomScreen() {
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const reversedData = chatList.reverse();

  const fetchQuestions = useFetch(
    'https://api.jsonbin.io/v3/b/609bd089e0aabd6e191cea85/latest',
    '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
  );
  console.log(fetchQuestions);
  const getAnswers = useFetch(
    'https://api.jsonbin.io/v3/b/609bd036e0aabd6e191cea1d',
    '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
  );

  useEffect(() => {
    setChatList([...fetchQuestions]);
  }, [fetchQuestions]);

  const giveRandomNumber = Math.floor(Math.random() * getAnswers.length);
  //answer: randomizes answers from responses array
  const answer = getAnswers[giveRandomNumber];

  //updates current data array with new values;
  const payload = JSON.stringify([...chatList, {question: message, answer}]);

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
      console.log(json);
      setChatList(json.record);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    updateQuestionList();
    setMessage('');
  };

  return (
    <View style={styles.container}>
      {fetchQuestions.length === 0 ? (
        <ActivityIndicator
          style={styles.activityContainer}
          size="large"
          color="#6646ee"
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          keyExtractor={(_, index) => index.toString()}
          data={reversedData}
          inverted
          renderItem={({item}) => (
            <Messages question={item.question} answer={item.answer} />
          )}
        />
      )}
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
  container: {
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  activityContainer: {
    marginVertical: 255,
  },
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
    backgroundColor: '#fff',
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
