import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, H1, Spinner } from 'native-base';
import axios from '../api/axios';

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleText = (text: string) => {
    setUsername(text);
  }

  const login = async () => {
    setLoading(true);
    try {
      const { data }: any = await axios.post('/', {
        username
      })
      console.log(data);
      setLoading(false);
      AsyncStorage.setItem('token', data);
      navigation.navigate('Main');
    } catch (err) {
      const { message } = err.response.data;
      setLoading(false);
      if (!!message) {
        Alert.alert(message);
      } else {
        Alert.alert('internal server error!')
      }
    }
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
            <Text style={styles.green}>*This is non password login, you can sign in using reserved username provided. Please contact developer.</Text>
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
  },
  green: {
    color: 'green'
  }
})
