import React, { useState } from 'react';
import { StyleSheet, Alert, Modal, AsyncStorage } from 'react-native';
import { Container, Content, Header, Fab, Icon, Left, Right, Body, Button, Title, Text, Row } from 'native-base';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

Main.defaultProps = {
  ...Constants.manifest.extra
}

export default function Main({ URI, navigation }: { URI: string, navigation: any }) {
  const [modalVisible, setModalVisible] = useState(false);

  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`;

  const logout = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  }

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
        <Row style={styles.content}>
          <Button danger iconLeft>
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
