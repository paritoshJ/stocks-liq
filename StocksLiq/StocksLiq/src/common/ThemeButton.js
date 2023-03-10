import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {themeProvide} from '../util/globalMethods';
import {fonts} from '../../assets/fonts/fonts';

const ThemeButton = props => {
  return (
    <TouchableOpacity
      style={[styles.opacityStyle, props.buttonstyle]}
      onPress={props.onPress}
      disabled={props.disabled}
      {...props}>
      <Text style={[styles.textStyle, props.textStyle]}>
        {props.buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  opacityStyle: {
    backgroundColor: themeProvide().primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginTop: 24,
    borderColor: themeProvide().primary,
    borderWidth: 1,
  },
  textStyle: {
    color: themeProvide().white,
    fontFamily: fonts.InterRegular,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
