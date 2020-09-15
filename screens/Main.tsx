import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Alert, Modal, AsyncStorage, Platform } from 'react-native';
import { Container, Content, Header, Fab, Icon, Left, Right, Body, Button, Title, Text, Row, Form, H1, Item, Label, Input, Picker } from 'native-base';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import initAxios from '../api/axios';

Main.defaultProps = {
  ...Constants.manifest.extra
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(message: any) {
  // const message = {
  //   to: expoPushToken,
  //   sound: 'default',
  //   title: 'Original Title',
  //   body: 'And here is the body!',
  //   data: { data: 'goes here' },
  // };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    token = '[simulator]';
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function Main({ URI, navigation, SERVER }: { URI: string, navigation: any, SERVER: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [active, setActive] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [form, setForm] = useState({
    to: '',
    sound: 'default',
    title: '',
    body: '',
    data: { from: '' },
  })
  const notificationListener = useRef();
  const responseListener = useRef();

  const axios = initAxios(SERVER);

  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`;

  const logout = async () => {
    try {
      await axios.post(`/logout/${active}`, { token: expoPushToken });
      AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (err) {
      const { message } = err?.response?.data;

      if (!!message) {
        Alert.alert(message);
      } else {
        Alert.alert('internal server error!')
      }
      AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    }
  }

  const sendNotification = () => {
    recipients.forEach(to => {
      form.to = to;
      form.data = {
        from: active
      }
      console.log({form});
      sendPushNotification(form);
    })
  }

  const handleText = (field: string, text: string) => {
    setForm(prevState => {
      return {
        ...prevState,
        [field]: text,
      }
    })
  }

  const fetchUsernames = async (active: string) => {
    try {
      const { data }: any = await axios.get('/users');
      const users = data.users.filter((user: any) => user.username !== active);

      setUsernames(users);
    } catch (err) {
      Alert.alert('Error fetching username recipients');
    }
  }

  const verifyToken = async (pushToken: string) => {
    try {
      const token: string | null = await AsyncStorage.getItem('token');
      const { data } = await axios.put('/', { token })

      setActive(data.username);
      await axios.post(`/pushtoken/${data.username}`, { token: pushToken });
      await fetchUsernames(data.username);
    } catch (err) {
      const { message } = err?.response?.data;

      if (!!message) {
        Alert.alert(message);
      } else {
        Alert.alert('internal server error!')
      }
      AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    }
  }

  useEffect(() => {
    (async() => {
      const token: string | undefined = await registerForPushNotificationsAsync();
      
      setExpoPushToken(token);
      try {
        await verifyToken(token);
      } catch(err) {
        const { message } = err?.response?.data;
        if (!!message) {
          Alert.alert(message);
        } else {
          Alert.alert('internal server error!')
        }
      }
    })();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log({notification});
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Container>
      <Header>
        <Body>
          <Title>KR Sample Webview</Title>
        </Body>
        <Right>
          <Button
            rounded
            transparent
            iconLeft
            onPress={logout}
          >
            <Icon name="md-log-out" />
          </Button>
        </Right>
      </Header>
      <Content>
        <Form>
          <Item picker>
            <Label>To</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select recipient"
              placeholderIconColor="#007aff"
              selectedValue={recipients}
              onValueChange={(value) => setRecipients(value)}
            >
              {
                usernames.map((username: any, key) => {
                  return (
                    <Picker.Item key={key} label={username.username} value={username.pushToken} />
                  )
                })
              }
            </Picker>
          </Item>
          <Item stackedLabel>
            <Label>Title</Label>
            <Input onChangeText={(text) => handleText('title', text)}/>
          </Item>
          <Item stackedLabel last>
            <Label>Body</Label>
            <Input onChangeText={(text) => handleText('body', text)}/>
          </Item>
        </Form>
        <Row style={styles.content}>
          <Button danger iconLeft onPress={sendNotification}>
            <Icon name="md-notifications" />
            <Text>
              Send Notification
            </Text>
          </Button>
        </Row>
      </Content>
      <Fab
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => setModalVisible(true)}
      >
        <Icon name="md-chatbubbles" />
      </Fab>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
      }}>
        <Container>
          <Header>
            <Left>
              <Button
                rounded
                transparent
                iconLeft
                onPress={() => setModalVisible(false)}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
          </Header>
          <WebView
            source={{ uri: URI }}
          />
        </Container>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center'
  }
});
