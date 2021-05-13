import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

function ChatList({item, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Room', {thread: item})}
      style={styles.cardStyle}>
      <View style={styles.userInfo}>
        <View style={styles.imageWrapper}>
          <Avatar.Text size={64} label={item.userName[0]} />
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
}

const styles = StyleSheet.create({
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

export default ChatList;
