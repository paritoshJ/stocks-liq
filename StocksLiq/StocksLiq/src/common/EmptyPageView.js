import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {themeProvide} from '../util/globalMethods';
import {fonts} from '../../assets/fonts/fonts';

const EmptyPageView = props => {
  const Icon = props.icon;
  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <View style={styles.mainView}>
        <View style={styles.circleStyle}>
          <Icon />
        </View>
        <Text style={[styles.titleStyle, props.titleStyle]}>{props.title}</Text>
        <Text style={[styles.msgStyle, props.msgStyle]}>{props.message}</Text>
        <TouchableOpacity
          style={[styles.opacityStyle, props.buttonstyle]}
          onPress={props.onAddClick}
          {...props}>
          <Text style={[styles.textStyle, props.textStyle]}>
            {props.buttonTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EmptyPageView;

const styles = StyleSheet.create({
  mainView: {justifyContent: 'center', flex: 1, alignItems: 'center'},
  circleStyle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacityStyle: {
    backgroundColor: themeProvide().primary,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
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
  titleStyle: {
    color: themeProvide().black,
    fontFamily: fonts.InterRegular,
    fontSize: 18,
    marginTop: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  msgStyle: {
    color: themeProvide().black,
    fontFamily: fonts.InterRegular,
    fontSize: 14,
    marginTop: 16,
    opacity: 0.5,
    fontWeight: '500',
    textAlign: 'center',
  },
});
