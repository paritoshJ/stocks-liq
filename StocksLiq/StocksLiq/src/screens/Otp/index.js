import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import OtpInputs from 'react-native-otp-inputs';

const OtpScreen = props => {
  const [otp, setOtp] = useState('');

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
  const onLoginPress = () => {
    props.navigation.navigate('SignUpScreen', {});
  };
  const renderButton = () => {
    return (
      <ThemeButton onPress={onLoginPress} buttonTitle={I18n.t('verify')} />
    );
  };
  const renderOtp = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <OtpInputs
          inputStyles={styles.inputStyle}
          handleChange={code => setOtp(code)}
          numberOfInputs={4}
        />
      </View>
    );
  };
  const renderOtpView = () => {
    return (
      <View>
        {renderWelcomeText()}
        {renderLoginORSignUpView()}
        {renderOtp()}
        {renderButton()}
      </View>
    );
  };
  const renderIcon = () => {
    return <LogoSvg />;
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={Platform.OS === 'android'}
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll={true}
      contentContainerStyle={styles.keyboardAwareScrollViewStyle}>
      <View style={styles.mainView}>
        <View style={styles.firstView}>{renderIcon()}</View>
        <View style={styles.secondView}>{renderOtpView()}</View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: themeProvide().white,
  },
  inputStyle: {
    backgroundColor: 'transparent',
    fontFamily: fonts.InterRegular,
    borderColor: themeProvide().secondry_back,
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 8,
    width: 64,
    height: 48,
    textAlign: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginVertical: 24,
  },
  mainView: {
    flex: 1,
    backgroundColor: themeProvide().primary_back,
  },
  firstView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondView: {
    flex: 1,
    padding: 24,
    backgroundColor: themeProvide().white,
  },
  welcomeText: {
    // fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  loginOrSignUpText: {
    // fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    opacity: 0.5,
    marginTop: 12,
    marginBottom: 24,
    marginHorizontal: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  loginSignupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
