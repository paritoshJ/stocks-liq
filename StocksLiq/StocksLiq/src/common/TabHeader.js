import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {themeProvide} from '../util/globalMethods';
import {fonts} from '../../assets/fonts/fonts';

const TabHeader = props => {
  return (
    <TouchableOpacity
      style={{flexGrow: 1}}
      activeOpacity={1}
      onPress={props.onPress}>
      <View
        style={[
          styles.back,
          {
            backgroundColor:
              props.backgroundColor ?? themeProvide().primary_back,
            borderBottomColor: props.isSelected
              ? themeProvide().primary
              : 'transparent',
            borderBottomWidth: props.isSelected ? 1 : 0,
            borderTopWidth: 0,
          },
        ]}>
        <Text
          style={[
            styles.logoTextStyle,
            {
              color: props.isSelected
                ? themeProvide().primary
                : themeProvide().black,
            },
          ]}>
          {props.title}
        </Text>
        {props.isSelected && (
          <View
            style={[
              styles.countView,
              {
                backgroundColor: props.isSelected
                  ? themeProvide().primary
                  : 'rgba(0, 0, 0, 0.16)',
              },
            ]}>
            <Text
              style={[
                styles.countTextStyle,
                {
                  color: props.isSelected
                    ? themeProvide().white
                    : themeProvide().black,
                },
              ]}>
              {props.count ?? 0}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  back: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeProvide().primary_back,
  },
  logoTextStyle: {
    color: themeProvide().black,
    fontFamily: fonts.InterRegular,
    fontSize: 16,
    fontWeight: '700',
  },
  countView: {
    backgroundColor: themeProvide().primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginLeft: 6,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  countTextStyle: {
    color: themeProvide().white,
    fontSize: 8,
    fontFamily: fonts.InterRegular,
    fontWeight: '600',
  },
});
