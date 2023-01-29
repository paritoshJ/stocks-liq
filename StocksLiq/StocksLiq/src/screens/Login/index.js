import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BeforeLoginWrapperView from '../../common/BeforeLoginWrapperView';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import ThemeInputView from '../../common/ThemeInputView';

const LoginScreen = props => {
  const [mobileNumber, setMobileNumber] = useState('');

  const renderWelcomeText = () => {
    return <Text style={styles.welcomeText}>{I18n.t('welcome')}</Text>;
  };
  const renderLoginORSignUpView = () => {
    return (
      <View style={styles.loginSignupView}>
        <View style={styles.lineView} />
        <Text style={styles.loginOrSignUpText}>{I18n.t('loginSignup')}</Text>
        <View style={styles.lineView} />
      </View>
    );
  };
  const onLoginPress = () => {
    props.navigation.navigate('OtpScreen', {mobileNumber: mobileNumber});
  };
  const renderButton = () => {
    return (
      <ThemeButton
        onPress={() => onLoginPress()}
        buttonTitle={I18n.t('continue')}
      />
    );
  };
  const renderInput = () => {
    return (
      <ThemeInputView
        placeholder={I18n.t('mobilePlaceholder')}
        onChangeText={val => {
          // console
          setMobileNumber(val);
        }}
        value={mobileNumber}
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
  return (
    <View style={styles.mainView}>
      <View style={styles.firstView}>{renderIcon()}</View>
      <View style={styles.secondView}>{renderLogin()}</View>
    </View>
  );
  //  return <BeforeLoginWrapperView icon={renderIcon} layoutView={renderLogin} />;
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: themeProvide().white,
    padding: 24,
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
    marginVertical: 24,
    marginHorizontal: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  loginSignupView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineView: {
    flex: 1,
    height: 1,
    backgroundColor: themeProvide().black,
    opacity: 0.16,
  },
});
