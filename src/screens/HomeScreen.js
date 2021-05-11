import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import FormButton from '../components/FormButton';

function HomeScreen({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMoviesFromApiAsync();
  }, []);

  const getMoviesFromApiAsync = async () => {
    try {
      let response = await fetch(
        'https://api.jsonbin.io/v3/b/6098055b7a19ef1245a63d17/3',
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Room', {thread: item})}
              style={styles.cardStyle}>
              <View style={styles.userInfo}>
                <View style={styles.imageWrapper}>
                  <Image style={styles.imageStyle} source={{uri: item.image}} />
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
