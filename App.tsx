import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';

import { SwitchNavigation } from './navigations';

export default function App() {
  const [ready, setReady] = useState(false);
  const Route = createAppContainer(SwitchNavigation);

  useEffect(() => {
    (async() => {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
      })
      setReady(true);  
    })();
  })
  return (
    ready &&
    <Route />
  );
}
