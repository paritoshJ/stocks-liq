import {
  Platform,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  isObjectNullOrUndefined,
  isStringNotNull,
  showMessageAlert,
  themeProvide,
} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';
import {doVerifyUser, doLoginUser} from './Action';
import {connect} from 'react-redux';
import Loader from '../../common/loader/Loader';
import {doSendOtp, setLoggedIn, doSaveUser, doSaveToken} from '../Login/Action';
import {doChangeLanguage} from '../Profile/Action';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = props => {
  const otpRef = useRef(null);
  const [otp, setOtp] = useState('');
  const [displayOtp, setDisplayOtp] = useState(props?.route?.params?.otp);
  const [isLoading, setLoading] = useState(false);
  const resetOTP = useCallback(() => {
    otpRef.current?.reset();
  }, []);
  useEffect(() => {
    showMessageAlert('Your Otp is ' + displayOtp);
    // otpRef.current.setOtp(props?.route?.params?.otp);
  }, [displayOtp]);

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
  const onVerifyPress = () => {
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
      onSuccess: (isSuccess, status, data) => {
        if (isSuccess) {
          console.log('doVerifyUser', data);
          if (data?.data?.is_number_registered === 0) {
            setLoading(false);
            props.navigation.navigate('SignUpScreen', {
              mobileNumber: props?.route?.params?.mobileNumber,
            });
          } else {
            onLogin();
          }
        } else {
          setLoading(false);
          resetOTP();
          alert(data);
        }
      },
    });
  };
  const onLogin = async () => {
    const hasFirstLaunched = await AsyncStorage.getItem('@user_language');
    console.log(hasFirstLaunched);
    props.doLoginUser({
      paramData: {
        mobile_number: props?.route?.params?.mobileNumber,
        device_type: Platform.OS,
        device_token: '',
        device_uniqueid: '111',
      },
      onSuccess: (isSuccess, status, response) => {
        setLoading(false);
        if (isSuccess && !isObjectNullOrUndefined(response?.data)) {
          if (response?.data?.is_deleted === 1) {
            showMessageAlert(
              'Your account is deleted please contact to admin for further info.',
            );
          } else {
            if (
              response?.data?.is_premium === 0 &&
              response?.data?.user_role === 'shop_owner'
            ) {
              props.navigation.navigate('PlanScreen', {
                userData: response?.data,
              });
            } else {
              props.doSaveToken(response?.data?.token);
              props.doSaveUser(response?.data);
              setTimeout(async () => {
                props.setLoggedIn(true);
                props.doChangeLanguage({
                  paramData: {lang_code: hasFirstLaunched},
                  onSuccess: () => {},
                });
              }, 1000);
            }
          }
        } else {
          showMessageAlert(response);
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
          setDisplayOtp(response.otp);
        }
      },
    });
  };
  const renderButton = () => {
    return (
      <ThemeButton onPress={onVerifyPress} buttonTitle={I18n.t('verify')} />
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
    // return <LogoSvg />;
    return (
      <LottieView
        resizeMode={'contain'}
        source={require('../../Animation/Enter Password.json')}
        autoPlay
        loop={false}
      />
    );
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
  doSaveToken: doSaveToken,
  setLoggedIn: setLoggedIn,
  doLoginUser: doLoginUser,
  doSaveUser: doSaveUser,
  doChangeLanguage: doChangeLanguage,
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
    height: 56,
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
    height: 250,
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
