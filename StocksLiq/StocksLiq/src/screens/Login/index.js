import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isStringNotNull, showMessageAlert, themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import ThemeInputView from '../../common/ThemeInputView';
import {doSendOtp} from './Action';
import {connect} from 'react-redux';
import Loader from '../../common/loader/Loader';

const LoginScreen = props => {
  console.log('LOGIN SCREEN CALLED');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setLoading] = useState(false);

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
    let msg = '';
    if (!isStringNotNull(mobileNumber)) {
      msg = I18n.t('emptyMobile');
    } else if (mobileNumber.length < 10) {
      msg = I18n.t('invalidMobile');
    } else if (mobileNumber.length > 12) {
      msg = I18n.t('invalidMobile');
    }
    if (isStringNotNull(msg)) {
      alert(msg);
      return;
    }
    setLoading(true);
    props.doSendOtp({
      mobile_number: mobileNumber,
      onSuccess: (isSuccess, status, response) => {
        setLoading(false);
        if (isSuccess) {
          props.navigation.navigate('OtpScreen', {
            mobileNumber: mobileNumber,
            otp: response.otp,
          });

        } else {
          // alert(response);
        }
      },
    });
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
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeProvide().primary_back}
      />

      <View style={styles.mainView}>
        <View style={styles.firstView}>{renderIcon()}</View>
        <View style={styles.secondView}>{renderLogin()}</View>
        <Loader
          loading={isLoading}
          isTransparent={true}
          color={themeProvide().primary}
          size={32}
        />
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  doSendOtp: doSendOtp,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  loginOrSignUpText: {
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    // opacity: 0.5,
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
    // opacity: 0.16,
  },
});
