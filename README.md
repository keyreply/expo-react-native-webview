# React Native Webview Using Expo

v1.1

## Change log
* Simulate passoword-less login scenario
* Added SERVER env variable, where to connect its backend. [See more.](https://github.com/keyreply/sample-server-react-native)
* Added push notification simulator from Expo Framework. [See more.](https://docs.expo.io/push-notifications/overview/)
* Multiple floating button to represent multiple scenario of chat window in webview


## Purpose
This repo serves a simple app of React Native using Expo Framework. The app simulates react-native-webview compoenent, so user can do a trial of rendering any website uri (mobile adjustment recommended) or through a html static.


## Pre-requirements

[Yarn](https://classic.yarnpkg.com/en/docs/install/)

[Expo CLI](https://expo.io/tools)

**Mobile Native Simulator:**

iOS Simulator

Android Studio Simulator

**or Expo Smartphone App:**

[Expo Client App Store](https://apps.apple.com/us/app/expo-client/id982107779)

[Expo Client Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)

Backend Mobile Setup. [Check repository.](https://github.com/keyreply/sample-server-react-native)


## Installation

Run install command using yarn
```
yarn
```


## Environment Setup

Please create `.env` file on the root directory to activate environment variables. To see the references, can be checked in `.env.example` file.


## Environment Variables
```
URI=(Website url that you want to put in)
SERVER=(backend url for login scenario and push token registry, recommended check on its backend repository)
```
Note: The env variables has been set up to be accessible from props of App component. After setting up the variables in the `.env`, can be accessed inside application, in the screen components, e.g. `Main.tsx` (dir: `src/screens/Main.tsx`). The url by default will be redirected to react native documentation.

```
...
function Main({ URI }: { URI: string; }) {

...

}
```

URI that should be used is the static html with specific script environment that already set to be applicable to the webview. [See more here.](https://doc.clickup.com/p/h/3fyzp-488/2a99f584bdc4dd8)

## Running The Application

Run the app using command
```
yarn start
```
Expo Developer Tool will be shown up automatically on the browser. App can be accessed through:

**QR CODE Scanner**:

Local network, LAN, or Tunnel

accessed through Expo mobile application

**Simulator**: Android / iOS

**USB Cable Connection**: Android

## Publish The Application

* Login through Expo CLI
* Publish app through Expo Developer Tool
* Fill in all required fields
* The App is published

## Additional Notes

This app by default is designed to support KeyReply WebChat application for mobile app. This app is used development purpose to satisfy any client's case. There will be some documentation for usage of webchat URI of KeyReply.

## Must Check Repository

[KR Demo App Backend Repository](https://github.com/keyreply/sample-server-react-native)

***

## Webchat Mobile Mode URI Documentation

[Reference.](https://doc.clickup.com/p/h/3fyzp-488/2a99f584bdc4dd8)