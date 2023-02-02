import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {themeProvide} from '../util/globalMethods';
import {fonts} from '../../assets/fonts/fonts';
import MoreMenuSvg from '../assets/svgs/MoreMenuSVG';
import LogoTabIconSVG from '../assets/svgs/LogoTabIconSVG';
import BackSVG from '../assets/svgs/BackSVG';

const ToolbarHeader = props => {
  const MenuToolbar = () => {
    return (
      <View
        style={[
          styles.back,
          {
            backgroundColor:
              props.backgroundColor ?? themeProvide().primary_back,
          },
        ]}>
        <TouchableOpacity
          style={[styles.opacityStyle, props.buttonstyle]}
          onPress={props.onPress}
          {...props}>
          <MoreMenuSvg />
        </TouchableOpacity>
        <View style={{paddingHorizontal: 18, flex: 1}}>
          {props.isLogo ? (
            <LogoTabIconSVG />
          ) : (
            <Text style={[styles.textStyle, props.textStyle]}>
              {props.title}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const BackToolbar = () => {
    return (
      <View>
        <TouchableOpacity
          style={[styles.opacityStyle, props.buttonstyle]}
          onPress={props.onPress}
          {...props}>
          <BackSVG />
        </TouchableOpacity>
        <View
          style={{paddingHorizontal: 18, flex: 1, justifyContent: 'center'}}>
          <Text style={[styles.textStyle, props.textStyle]}>{props.title}</Text>
        </View>
      </View>
    );
  };

  return <View>{props.logoToolbarType ? MenuToolbar() : BackToolbar()}</View>;
};

export default ToolbarHeader;

const styles = StyleSheet.create({
  opacityStyle: {
    borderWidth: 0,
  },
  back: {
    backgroundColor: themeProvide().primary_back,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: themeProvide().black,
    fontFamily: fonts.InterRegular,
    fontSize: 24,
    fontWeight: '900',
  },
});
