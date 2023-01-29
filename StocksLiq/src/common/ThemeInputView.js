import {View, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {themeProvide} from '../util/globalMethods';
import {fonts} from '../../assets/fonts/fonts';

const ThemeInputView = props => {
  const [inputValue, onChangeText] = useState(props.value ? props.value : '');
  return (
    <View style={[styles.viewStyle, props.buttonstyle]} {...props}>
      <TextInput
        style={[styles.inputStyle, props.inputStyle]}
        placeholder={props.placeholder}
        value={inputValue}
        onChangeText={val => {
          props.onChangeText(val);
        }}
        returnKeyType={props.returnKeyType ?? 'default'}
        keyboardType={props.keyboardType ?? 'default'}
      />
    </View>
  );
};

export default ThemeInputView;

const styles = StyleSheet.create({
  viewStyle: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginVertical: 24,
    borderColor: themeProvide().secondry_back,
    borderWidth: 1,
  },
  inputStyle: {
    backgroundColor: 'transparent',
    fontFamily: fonts.InterRegular,
    fontSize: 16,
  },
});
