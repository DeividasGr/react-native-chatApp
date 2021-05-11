import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {Title} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';

function ProfileScreen() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {user, editUserProfile} = useContext(AuthContext);

  const handleUserInfoEdit = (email, password) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (password.length === 0) {
      if (reg.test(email) === false) {
        setErrorMessage('Correct email pattern is required');
        return false;
      } else {
        cleanup(email, password);
      }
    } else {
      cleanup(email, password);
    }
  };

  const cleanup = (email, password) => {
    editUserProfile(email, password);
    setNewEmail('');
    setNewPassword('');
    setErrorMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Title style={styles.title}>Current email: {user.email}</Title>
        <FormInput
          value={newEmail}
          labelName="New Email"
          autoCapitalize="none"
          onChangeText={value => setNewEmail(value)}
        />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <FormButton
          title="Update Email"
          modeValue="contained"
          onPress={() => handleUserInfoEdit(newEmail, newPassword)}
        />
      </View>
      <View style={styles.infoContainer}>
        <Title style={styles.title}>Current password: {user.password}</Title>
        <FormInput
          value={newPassword}
          labelName="New Password"
          secureTextEntry={true}
          onChangeText={value => setNewPassword(value)}
        />
        <FormButton
          title="Update Password"
          modeValue="contained"
          onPress={() => handleUserInfoEdit(newEmail, newPassword)}
        />
      </View>
      <Title style={styles.title}>Your userId: {user.id}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
    margin: 15,
  },
  infoContainer: {
    marginBottom: 35,
    alignItems: 'center',
  },
  errorMessage: {
    color: '#ec5c5c',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    alignSelf: 'center',
  },
});

export default ProfileScreen;
