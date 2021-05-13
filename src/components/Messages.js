import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Messages = ({question, answer}) => {
  return (
    <View>
      {answer ? (
        <View style={styles.incomingMsgBox}>
          <Text style={styles.incomingMsgText}>{answer}</Text>
        </View>
      ) : null}
      {question ? (
        <Text style={styles.sentMsgBox}>
          <Text style={styles.sentMsgText}>{question}</Text>
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  incomingMsgBox: {
    backgroundColor: '#e4e2e2',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  incomingMsgText: {
    color: '#333',
    fontSize: 16,
  },
  sentMsgBox: {
    backgroundColor: '#6646ee',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  sentMsgText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Messages;
