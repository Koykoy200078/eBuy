import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import {COLORS} from './src';
import App from './src/navigations/AppNavigation';

export default function () {
  return (
    <>
      <StatusBar
        animated={true}
        translucent={false}
        backgroundColor={COLORS.BGColor}
        barStyle={'dark-content'}
      />

      <App />
    </>
  );
}
