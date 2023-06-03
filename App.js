import React, {useEffect} from 'react';
import {StatusBar, Alert, BackHandler, Platform} from 'react-native';
import codePush from 'react-native-code-push';

import {COLORS} from './src';
import AppNav from './src/navigations/AppNavigation';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthProvider} from './src/providers/AuthProvider';

import configureStore from './src/apps/reducers';
import rootSaga from './src/apps/sagas';
import {globalResetActions} from './src/globalResetActions';
import {showError, showSuccess} from './src/apps/others/helperFunctions';

const {store, persistor, runSaga} = configureStore();

runSaga(rootSaga);

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: 'New Version Available',
    appendReleaseDescription: true,
    descriptionPrefix: '\n\nChangelog: ',
    mandatoryUpdateMessage:
      'An update is available. Would you like to install it now?',
    mandatoryContinueButtonLabel: 'Install',
  },
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  const backAction = () => {
    Alert.alert('Exit', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => logout()},
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    codePush.checkForUpdate().then(update => {
      if (!update) {
        showSuccess({
          message: 'You are using the latest version of the app.',
        });
      } else {
        showSuccess({
          message: 'New version available.',
        });
      }
    });

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  function logout() {
    store.dispatch(globalResetActions());

    BackHandler.exitApp();
  }

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
            <AppNav />
          </AuthProvider>
        </PersistGate>
      </StoreProvider>

      <Toast topOffset={10} />
    </>
  );
};

export default codePush(codePushOptions)(App);
