import React, { useState } from 'react';
import { StyleSheet, Alert, Modal, SafeAreaView, Button } from 'react-native';
import { View, TouchableOpacity, Text } from "react-native";
import { Keyboard, TextInput } from 'react-native';
import { Container, Header, Fab, Icon, Left, Body, Title } from 'native-base';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import KeyboardListener from 'react-native-keyboard-listener';
App.defaultProps = {
  ...Constants.manifest.extra
}

export default function App({ URI }: { URI: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`;

  return (
    <Container>
      <Header>
        <Body>
          <Title>KR Sample Webview</Title>
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
          <SafeAreaView style={[styles.container, { backgroundColor: '#ffffff' }]}>
            <View style={styles.container}>
              <KeyboardListener
                onWillShow={() => { this.setState({ keyboardOpen: true }); }}
                onWillHide={() => { this.setState({ keyboardOpen: false }); }}
              />
              <WebView source={{ uri: URI }} />
              <View style={styles.cancelPosition}>  
              <Button 
                onPress={() => setModalVisible(false)} 
                title="x" color="#FFFFFF" />
              </View>
            </View>
          </SafeAreaView>
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
  cancelPosition: {
    position:'absolute',
    right:0,
    marginTop:10,
    marginRight:10,
    zIndex:1,
    height:30,
    width:30
  }
});
