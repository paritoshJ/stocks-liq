import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import ThemeInputView from '../../common/ThemeInputView';

const SignUpScreen = props => {
  const [storeName, setStoreName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const storeRef = React.useRef(null);
  const firstNameRef = React.useRef(null);
  const lastNameRef = React.useRef(null);
  const reffralRef = React.useRef(null);
  const renderWelcomeText = () => {
    return (
      <Text style={styles.welcomeText}>{I18n.t('signUpDescription')}</Text>
    );
  };
  const onLoginPress = () => {
    // props.navigation.navigate('OtpScreen',{});
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
      <>
        <ThemeInputView
          ref={storeRef}
          placeholder={I18n.t('storeName')}
          onChangeText={val => {
            setStoreName(val);
          }}
          value={storeName}
          returnKeyType={'next'}
          keyboardType={'default'}
          onSubmitEditing={() => {
            firstNameRef.current?.focus();
          }}
        />
        <ThemeInputView
          ref={firstNameRef}
          placeholder={I18n.t('firstName')}
          onChangeText={val => {
            setFirstName(val);
          }}
          value={firstName}
          returnKeyType={'next'}
          keyboardType={'default'}
          onSubmitEditing={() => {
            lastNameRef.current?.focus();
          }}
        />
        <ThemeInputView
          ref={lastNameRef}
          placeholder={I18n.t('lastName')}
          onChangeText={val => {
            setLastName(val);
          }}
          value={lastName}
          returnKeyType={'next'}
          keyboardType={'default'}
          onSubmitEditing={() => {
            reffralRef.current?.focus();
          }}
        />
        <ThemeInputView
          ref={reffralRef}
          placeholder={I18n.t('referralCode')}
          onChangeText={val => {
            setReferralCode(val);
          }}
          value={referralCode}
          returnKeyType={'done'}
          keyboardType={'default'}
        />
      </>
    );
  };
  const renderLogin = () => {
    return (
      <View>
        {renderWelcomeText()}
        {renderInput()}
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
        <View style={styles.secondView}>{renderLogin()}</View>
      </View>
    </KeyboardAwareScrollView>
  );
  //  return <BeforeLoginWrapperView icon={renderIcon} layoutView={renderLogin} />;
};

export default SignUpScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: themeProvide().white,
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
