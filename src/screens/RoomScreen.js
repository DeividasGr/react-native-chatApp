import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Msg from '../components/Messages';
// import {data} from '../data/data';

let chats = [];
console.log(chats);

function RoomScreen() {
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  console.log(chatList);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const initialQuestion = data[0]?.answer;
    setChatList([...chats, {msg: initialQuestion, incomingMsg: true}]);
  }, [data]);

  const fetchQuestions = async () => {
    try {
      let response = await fetch(
        'https://api.jsonbin.io/v3/b/609993b96e36c66e535fab26',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$8RHzIQysv7vAABNOmRgDZe0Hlu8krfvcUql0qPlCBLndTUPh.0F4e',
          },
        },
      );
      let json = await response.json();
      setData(json.record);
    } catch (error) {
      console.error(error);
    }
  };

  const getAnswer = qst => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].question.includes(qst.toLowerCase())) {
        chats = [...chats, {msg: data[i].answer, incomingMsg: true}];
        setChatList([...chats].reverse());
        return;
      }
    }
    chats = [
      ...chats,
      {msg: "Didn't recognise your question", incomingMsg: true},
    ];
    setChatList([...chats].reverse());
    return;
  };

  const onSendMessage = () => {
    chats = [...chats, {msg: message, sentMsg: true}];
    setChatList([...chats].reverse());
    setTimeout(() => {
      getAnswer(message);
    }, 1000);
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
          <Msg
            incomingMsg={item.incomingMsg}
            msg={item.msg}
            sentMsg={item.sentMsg}
          />
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

// import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
// import {IconButton} from 'react-native-paper';

// function RoomScreen({navigation, route}) {
//   const [messages, setMessages] = useState([
//     {
//       _id: 1,
//       text: 'hello',
//       createdAt: new Date().getTime(),
//       user: {
//         _id: 2,
//         name: route.params.thread.userName,
//       },
//     },
//   ]);

//   // helper method that is sends a message
//   function handleSend(newMessage = []) {
//     setMessages(GiftedChat.append(messages, newMessage));
//   }

//   function renderBubble(props) {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#6646ee',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff',
//           },
//         }}
//       />
//     );
//   }

//   function renderSend(props) {
//     return (
//       <Send {...props}>
//         <View style={styles.sendingContainer}>
//           <IconButton icon="send-circle" size={32} color="#6646ee" />
//         </View>
//       </Send>
//     );
//   }

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={newMessage => handleSend(newMessage)}
//       user={{_id: 1}}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//     />
//   );
// }

// const styles = StyleSheet.create({
//   sendingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomComponentContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default RoomScreen;
