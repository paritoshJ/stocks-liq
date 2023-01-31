import {View, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {themeProvide} from '../util/globalMethods';
import {fonts} from '../../assets/fonts/fonts';

const ThemeInputView = props => {
  return (
    <TextInput
      ref={props.innerRef}
      style={[styles.inputStyle, props.inputStyle]}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      returnKeyType={props.returnKeyType}
      keyboardType={props.keyboardType}
      onSubmitEditing={props.onSubmitEditing}
      {...props}
    />
  );
};

export default React.memo(ThemeInputView);

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    fontFamily: fonts.InterRegular,
    borderColor: themeProvide().secondry_back,
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginVertical: 10,
  },
});
