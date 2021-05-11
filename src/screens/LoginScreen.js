import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

function LoginScreen() {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleLoginForm = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email === '' || password === '') {
      setValidationMessage('Input fields cannot be empty');
    } else if (reg.test(email) === false) {
      setValidationMessage('Correct email pattern is required');
      return false;
    } else {
      login(email, password);
      setValidationMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titletext}>Welcome to Chat App</Title>
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        labelName="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      {validationMessage ? (
        <Text style={styles.validationError}>{validationMessage}</Text>
      ) : null}

      <FormButton
        onPress={handleLoginForm}
        title="Login"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
  validationError: {
    color: '#ec5c5c',
    fontSize: 18,
    marginVertical: 15,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
