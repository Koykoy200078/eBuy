import Toast from 'react-native-toast-message';

const showError = ({message, description}) => {
  Toast.show({
    type: 'error',
    text1: message,
    text2: description,
  });
};

const showSuccess = ({message, description}) => {
  Toast.show({
    type: 'success',
    text1: message,
    text2: description,
  });
};

export {showError, showSuccess};
