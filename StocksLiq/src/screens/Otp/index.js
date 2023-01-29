import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import BeforeLoginWrapperView from '../../common/BeforeLoginWrapperView';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import ThemeInputView from '../../common/ThemeInputView';

const OtpScreen = (props) => {

  console.log(props?.route.params);
  const renderWelcomeText = () => {
    return <Text style={styles.welcomeText}>{I18n.t('otpVerification')}</Text>;
  };
  const renderLoginORSignUpView = () => {
    return (
      <View style={styles.loginSignupView}>
        <Text style={styles.loginOrSignUpText}>
          {I18n.t('descriptionText', {
            mobileNumber: props?.route?.params?.mobileNumber,
          })}
        </Text>
      </View>
    );
  };
  const onLoginPress = () => {};
  const renderButton = () => {
    return (
      <ThemeButton onPress={onLoginPress()} buttonTitle={I18n.t('continue')} />
    );
  };
  const renderInput = () => {
    return (
      <ThemeInputView
        placeholder={I18n.t('mobilePlaceholder')}
        // onChangeText={val => {
        //   setMobileNumber(val);
        // }}
        // value={mobileNumber}
        returnKeyType={'default'}
        keyboardType={'phone-pad'}
      />
    );
  };
  const renderLogin = () => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={Platform.OS === 'android'}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
        contentContainerStyle={styles.keyboardAwareScrollViewStyle}>
        <View>
          {renderWelcomeText()}
          {renderLoginORSignUpView()}
          {renderInput()}
          {renderButton()}
        </View>
      </KeyboardAwareScrollView>
    );
  };
  const renderIcon = () => {
    return <LogoSvg />;
  };
  return <BeforeLoginWrapperView icon={renderIcon} layoutView={renderLogin} />;
};

export default OtpScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: themeProvide().white,
    padding: 24,
  },
  welcomeText: {
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 900,
  },
  loginOrSignUpText: {
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    opacity: 0.5,
    marginTop: 12,
    marginBottom: 24,
    marginHorizontal: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 500,
  },
  loginSignupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
