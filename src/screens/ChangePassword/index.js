import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../apps/configs/icons';
import {COLORS, IMAGES} from '../..';
import {
  getUserUpdateData,
  resetUserUpdateData,
} from '../../apps/reducers/userUpdateData';
import {showError, showSuccess} from '../../apps/others/helperFunctions';
import {userData} from '../../apps/reducers/userData';

export default function ({navigation}) {
  const data = useSelector(state => state.userData.data2);
  const updateUser = useSelector(state => state.userUpdateData.data);

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPass, setConfirmNewPass] = useState(null);

  const saveInfo = () => {};

  const resetFormFields = () => {
    setOldPassword(null);
    setNewPassword(null);
    setConfirmNewPass(null);
  };

  //   useEffect(() => {
  //     dispatch(userData());

  //     if (updateUser) {
  //       const {message} = updateUser;
  //       switch (message) {
  //         case 'User Profile Updated':
  //           showSuccess({
  //             message: message,
  //           });
  //           break;
  //         case message.pin_code:
  //           showError({
  //             message: message.pin_code,
  //           });
  //           break;
  //         default:
  //           showError({
  //             message: 'Something went wrong',
  //             description: 'Please try again',
  //           });
  //       }
  //       dispatch(resetUserUpdateData());
  //       resetFormFields();
  //     }
  //   }, [updateUser]);

  const renderProfile = () => {
    return (
      <View className="w-[100%] h-fit items-center justify-center p-2">
        <View className="w-fit h-fit rounded-full">
          <Image
            source={IMAGES.user}
            className="w-[130] h-[130] rounded-full"
          />
        </View>
      </View>
    );
  };

  const renderInfo = () => {
    return (
      <View className="w-[100%] h-fit items-start justify-center p-2">
        <View className="h-[65] w-[100%] mb-2">
          <Text className="text-sm font-bold" style={{color: COLORS.textColor}}>
            Old Password
          </Text>
          <TextInput
            className="p-2 rounded-md border"
            style={{
              color: COLORS.textColor,
            }}
            placeholder={'Old Password'}
            value={oldPassword}
            onChangeText={val => setOldPassword(val)}
          />
        </View>

        <View className="h-[65] w-[100%] mb-2">
          <Text className="text-sm font-bold" style={{color: COLORS.textColor}}>
            New Password
          </Text>
          <TextInput
            className="p-2 rounded-md border"
            style={{
              color: COLORS.textColor,
            }}
            placeholder={'New Password'}
            value={newPassword}
            onChangeText={val => setNewPassword(val)}
          />
        </View>

        <View className="h-[65] w-[100%] mb-2">
          <Text className="text-sm font-bold" style={{color: COLORS.textColor}}>
            Confirm New Password
          </Text>
          <TextInput
            className="p-2 rounded-md border"
            style={{
              color: COLORS.textColor,
            }}
            placeholder={'Confirm New Password'}
            value={confirmNewPass}
            onChangeText={val => setConfirmNewPass(val)}
          />
        </View>

        <View className="h-[65] w-[100%] mt-2">
          <TouchableOpacity onPress={() => saveInfo()}>
            <View className="flex-row h-fit items-center justify-center p-2 border rounded">
              <View className="w-[30] h-[30] items-center justify-center">
                <Icons.MaterialIcons
                  name="save"
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              <Text
                className="text-base font-bold"
                style={{color: COLORS.textColor}}>
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex flex-row justify-between w-full">
        <View View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => {
              dispatch(resetUserUpdateData());
              resetFormFields();
              navigation.goBack();
            }}
            className="p-2 rounded-tr-2xl rounded-bl-2xl">
            <Icons.Ionicons
              name="arrow-undo"
              size={30}
              color={COLORS.textColor}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {renderProfile()}
      {renderInfo()}
    </View>
  );
}
