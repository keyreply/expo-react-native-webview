import React from 'react';
import { createAppContainer } from 'react-navigation';

import { SwitchNavigation } from './navigations';

export default function App() {
  const Route = createAppContainer(SwitchNavigation);
  return (
    <Route />
  );
}
