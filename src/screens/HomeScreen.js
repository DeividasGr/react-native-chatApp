import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FormButton from '../components/FormButton';

function HomeScreen({navigation}) {
  const [chatListData, setChatListData] = useState([]);

  useEffect(() => {
    getChatList();
  }, [chatListData]);

  const getChatList = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/609aea29e0aabd6e191c18fe',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$9PRj4Srm4jEJgJsV/mhQDeCFqGjCnTp5s848K0rdYzE/mtCMyFamC',
          },
        },
      );
      const json = await response.json();
      setChatListData(json.record);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatListData}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Room', {thread: item})}
              style={styles.cardStyle}>
              <View style={styles.userInfo}>
                <View style={styles.imageWrapper}>
                  <Text style={styles.imageStyle}>{item.userName[0]}</Text>
                </View>
                <View style={styles.textSectionStyle}>
                  <View style={styles.userText}>
                    <Text style={styles.usernameStyle}>{item.userName}</Text>
                    <Text style={styles.timeStyle}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.messageStyle}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <FormButton
        onPress={() => navigation.navigate('Profile')}
        title="Go to Profile"
        modeValue="contained"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageStyle: {
    fontSize: 25,
    color: '#fff',
  },
  cardStyle: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    paddingVertical: 15,
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#c787f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 15,
    marginLeft: 15,
    width: 290,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  usernameStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
  timeStyle: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Lato-Regular',
  },
  messageStyle: {
    fontSize: 14,
    color: '#333',
  },
});

export default HomeScreen;
