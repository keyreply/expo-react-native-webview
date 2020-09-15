import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, H1, Spinner, View } from 'native-base';
import Constants from 'expo-constants';

import initAxios from '../api/axios';

Login.defaultProps = {
  ...Constants.manifest.extra
}

export default function Login({ navigation, SERVER }: any) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const axios = initAxios(SERVER);

  const handleText = (text: string) => {
    setUsername(text);
  }

  const login = async () => {
    setLoading(true);
    try {
      const { data }: any = await axios.post('/', {
        username
      })
      setLoading(false);
      AsyncStorage.setItem('token', data);
      navigation.navigate('Main');
    } catch (err) {
      const { message } = err?.response?.data;
      setLoading(false);
      if (!!message) {
        Alert.alert(message);
      } else {
        Alert.alert('internal server error!')
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const token: string | null = await AsyncStorage.getItem('token');

        if (!token) {
          setCheckingToken(false);
          return;
        }
        await axios.put('/', { token })
        navigation.navigate('Main');
      } catch (err) {
        const { message } = err?.response?.data;
        
        if (!!message) {
          Alert.alert(message);
        } else {
          Alert.alert('internal server error!')
        }
        AsyncStorage.removeItem('token');
        setCheckingToken(false);
      }
    })();
  }, [])

  return (
    checkingToken ?
    <View style={styles.loading}>
      <Spinner color='red' />
    </View>
    :
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container style={styles.container}>
          <View style={styles.content}>
            <Form>
              <H1 style={[styles.red, styles.mb10]}>KR Mobile Demo</H1>
              <Item stackedLabel last>
                <Label>Username</Label>
                <Input onChangeText={handleText}/>
              </Item>
              <Text style={styles.green}>*This is non password login, you can sign in using reserved username provided. Please contact developer.</Text>
            </Form>
            <Button block danger onPress={!loading && login}>
              {
                loading ?
                  <Spinner color='white' />
                :
                  <Text>Sign In</Text>
              }
            </Button>
          </View>
          <View style={styles.footer}>
            <Text>Copyright - KeyReply</Text>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
)};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly', 
  },
  red: {
    color: 'red'
  },
  mb10: {
    marginBottom: 10
  },
  green: {
    color: 'green'
  },
  footer: {
    alignItems: 'center'
  }
})
