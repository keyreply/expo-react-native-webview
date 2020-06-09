import React, { useState } from 'react';
import { StyleSheet, Alert, SafeAreaView, Modal } from 'react-native';
import { Container, Header, Content, Fab, Icon, Left, Body, Button, Text, Title, View } from 'native-base';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <Header>
          <Body>
            <Title>Webview React Native</Title>
          </Body>
        </Header>
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
            <Content>
              <Text>Open up App.tsx to start working on your app!</Text>
            </Content>
          </Container>
        </Modal>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
