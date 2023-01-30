import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useRef, useCallback} from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isStringNotNull, themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';
import {doVerifyUser} from './Action';
import {connect} from 'react-redux';
import Loader from '../../common/loader/Loader';
import {doSendOtp} from '../Login/Action';

const OtpScreen = props => {
  const otpRef = useRef(null);
  const [otp, setOtp] = useState('');
  const [isLoading, setLoading] = useState(false);
  const resetOTP = useCallback(() => {
    otpRef.current.reset();
  }, [])
  const renderWelcomeText = () => {
    return <Text style={styles.welcomeText}>{I18n.t('otpVerification')}</Text>;
  };
  const renderResedText = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          onResendPress();
        }}>
        <Text style={styles.resendText}>{I18n.t('resend')}</Text>
      </TouchableOpacity>
    );
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
    let msg = '';
    if (!isStringNotNull(otp) || otp.length != 4) {
      msg = I18n.t('emptyOtp');
    }
    if (isStringNotNull(msg)) {
      alert(msg);
      return;
    }
    setLoading(true);
    props.doVerifyUser({
      mobile_number: props?.route?.params?.mobileNumber,
      otp: otp,
      onSuccess: (isSuccess, status, response) => {
        setLoading(false);
        if (isSuccess) {
          if (response?.data?.is_number_registered === 0) {
            props.navigation.navigate('SignUpScreen', {});
          }
        } else {
          alert(response);
          resetOTP();
        }
      },
    });
  };
  const onResendPress = () => {
    setLoading(true);
    props.doReSendOtp({
      mobile_number: props?.route?.params?.mobileNumber,
      onSuccess: (isSuccess, status, response) => {
        setLoading(false);
        if (isSuccess) {
          resetOTP();
        }
        alert(response);
      },
    });
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
          ref={otpRef}
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
        {renderResedText()}
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
      <Loader
        loading={isLoading}
        isTransparent={true}
        color={themeProvide().primary}
        size={32}
      />
    </KeyboardAwareScrollView>
  );
};
const mapStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  doVerifyUser: doVerifyUser,
  doReSendOtp: doSendOtp,
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);

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
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  resendText: {
    fontFamily: fonts.InterRegular,
    color: themeProvide().primary,
    marginVertical: 24,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
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
    fontWeight: '500',
  },
  loginSignupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
