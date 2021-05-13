import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import FormButton from '../components/FormButton';
import ChatList from '../components/ChatList';
import useFetch from '../hooks/useFetch';

function HomeScreen({navigation}) {
  const chatListData = useFetch(
    'https://api.jsonbin.io/v3/b/609bba991a02f86e1f0a612e/latest',
    '$2b$10$.llxzf5K1Vn5fqFajCg.WugkRDVYwNu0gCKwm5KGq7BPqXgdCdRfG',
  );

  return (
    <View style={styles.container}>
      {chatListData.length === 0 ? (
        <ActivityIndicator
          style={styles.activityContainer}
          size="large"
          color="#6646ee"
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={chatListData}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <ChatList item={item} navigation={navigation} />;
          }}
        />
      )}
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
  activityContainer: {
    marginVertical: 270,
  },
});

export default HomeScreen;
