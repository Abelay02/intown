import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Assuming email and password state variables exist
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
  
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
  
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email}
        onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password}
        onChangeText={setPassword} secureTextEntry={true} style={styles.input} />
      {isLoginScreen ? (
        <>
          <Button title="Login" onPress={() => {}} />
          <Button title="Sign up instead" onPress={() => setIsLoginScreen(false)} />
        </>
      ) : (
        <>
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button title="Login instead" onPress={() => setIsLoginScreen(true)} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
  },
});

export default AuthScreen;