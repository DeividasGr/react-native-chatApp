import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FormButton from '../components/FormButton';
import ChatList from '../components/ChatList';

function HomeScreen({navigation}) {
  const [chatListData, setChatListData] = useState([]);

  const fetchList = useCallback(() => {
    getChatList();
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const getChatList = async () => {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/609bba991a02f86e1f0a612e/latest',
        {
          headers: {
            'X-Master-Key':
              '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
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
        showsVerticalScrollIndicator={false}
        data={chatListData}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <ChatList item={item} navigation={navigation} />;
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
});

export default HomeScreen;
