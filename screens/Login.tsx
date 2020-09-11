import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, H1, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleText = (text: string) => {
    setUsername(text);
  }

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(username);
      navigation.navigate('Main');
    }, 1000)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container style={styles.container}>
          <Form>
            <H1 style={[styles.red, styles.mb10]}>KR Mobile Demo</H1>
            <Item stackedLabel last>
              <Label>Username</Label>
              <Input onChangeText={handleText}/>
            </Item>
          </Form>
          <Button block danger onPress={login}>
            {
              loading ?
                <Spinner color='white' />
              :
                <Text>Sign In</Text>
            }
          </Button>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    margin: 10
  },
  red: {
    color: 'red'
  },
  mb10: {
    marginBottom: 10
  }
})
