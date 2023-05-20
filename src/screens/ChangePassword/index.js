import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView, Alert} from 'react-native';
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
import {
  changePassword,
  resetChangePassword,
} from '../../apps/reducers/changepass';

export default function ({navigation}) {
  const data = useSelector(state => state.changepass.data);

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPass, setConfirmNewPass] = useState(null);

  const saveInfo = () => {
    if (oldPassword) {
      if (confirmNewPass !== newPassword) {
        showError({
          message: 'New Password and Confirm Password does not match',
        });
      } else {
        Alert.alert('Info', 'Are you sure you want to change password?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              dispatch(
                changePassword({
                  current_password: oldPassword,
                  password: newPassword,
                }),
              );
            },
          },
        ]);
      }
    } else {
      showError({
        message: 'Please enter old password',
      });
    }
  };

  const resetFormFields = () => {
    setOldPassword(null);
    setNewPassword(null);
    setConfirmNewPass(null);
    dispatch(resetChangePassword());
  };

  useEffect(() => {
    if (data && data.message === ' Current Password does not match') {
      showError({
        message: 'Current Password does not match',
      });
      resetFormFields();
    } else if (data && data.message === 'Password Updated Successfully') {
      showSuccess({
        message: 'Password changed successfully',
      });
      resetFormFields();
    }
  }, [data]);

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
