import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../..';
import {Icons} from '../../apps/configs/icons';
import {ActivityIndicator} from 'react-native-paper';

export default function ({
  placeholder,
  value,
  onChangeText,
  onPressButton,
  // icons,
  searchLoading,
}) {
  return (
    <View className="mx-4 flex-row justify-between items-center space-x-3">
      <View
        className="flex-row flex-1 p-2 rounded-2xl items-center w-[150] h-[50]"
        style={{backgroundColor: COLORS.borderColor}}>
        <Icons.Feather name="search" size={24} color={COLORS.textColor} />
        <TextInput
          placeholder={placeholder}
          className="ml-2 w-[210] h-10"
          value={value}
          onChangeText={onChangeText}
          style={{color: COLORS.textColor}}
          placeholderTextColor={COLORS.textColor}
        />
      </View>

      {searchLoading ? (
        <View
          className="rounded-2xl p-3"
          style={{backgroundColor: COLORS.borderColor}}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPressButton}
          className="rounded-2xl p-4"
          style={{backgroundColor: COLORS.borderColor}}>
          <Icons.FontAwesome name={'send'} size={20} color={COLORS.textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}
