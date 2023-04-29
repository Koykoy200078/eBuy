import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';

import {COLORS, ROUTES} from './src';
import App from './src/navigations/AppNavigation';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider as StoreProvider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthProvider} from './src/providers/AuthProvider';

import configureStore from './src/apps/reducers';
import rootSaga from './src/apps/sagas';

const {store, persistor, runSaga} = configureStore();

runSaga(rootSaga);

export default function ({navigation}) {
  return (
    <>
      <StatusBar
        animated={true}
        translucent={false}
        backgroundColor={COLORS.BGColor}
        barStyle={'dark-content'}
      />

      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PersistGate>
      </StoreProvider>

      <Toast />
    </>
  );
}
