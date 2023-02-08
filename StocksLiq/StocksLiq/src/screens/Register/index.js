import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isStringNotNull, themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import ThemeInputView from '../../common/ThemeInputView';
import {doSignUpUser} from './Action';
import {connect} from 'react-redux';
import Loader from '../../common/loader/Loader';
import {doSaveUser, doSaveToken} from '../Login/Action';
import LottieView from 'lottie-react-native';

const SignUpScreen = props => {
  const [storeName, setStoreName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const storeRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const reffralRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const renderWelcomeText = () => {
    return (
      <Text style={styles.welcomeText}>{I18n.t('signUpDescription')}</Text>
    );
  };
  const onLoginPress = () => {
    let msg = '';
    if (!isStringNotNull(storeName)) {
      msg = I18n.t('emptyStoreName');
    } else if (!isStringNotNull(firstName)) {
      msg = I18n.t('emptyFirstName');
    } else if (!isStringNotNull(lastName)) {
      msg = I18n.t('emptyLastName');
    }
    if (isStringNotNull(msg)) {
      alert(msg);
      return;
    }

    let params = {
      mobile_number: props?.route?.params?.mobileNumber,
      device_type: Platform.OS,
      device_token: 'abc',
      device_uniqueid: 'acb',
      first_name: firstName,
      last_name: lastName,
      store_name: storeName,
      referral_code: referralCode,
    };

    setLoading(true);
    props.doSignUpUser({
      paramData: params,
      onSuccess: (isSuccess, status, response) => {
        setLoading(false);
        if (isSuccess) {
          if (response?.data) {
            // props.navigation.navigate('SignUpScreen', {});
            if (response?.data.is_primium == 1) {
              props.navigation.navigate('PlanScreen', {});
            } else {
              props.navigation.navigate('RegisterSuccessScreen', {
                userData: response?.data,
              });
            }
          }
        } else {
          alert(response);
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
      <>
        <ThemeInputView
          innerRef={storeRef}
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
          innerRef={firstNameRef}
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
          innerRef={lastNameRef}
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
          innerRef={reffralRef}
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
    // return <LogoSvg />;
    return (
      <LottieView
        source={require('../../Animation/More Details.json')}
        autoPlay
        loop
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
        <View style={styles.secondView}>{renderLogin()}</View>
      </View>
      <Loader
        loading={isLoading}
        isTransparent={true}
        color={themeProvide().primary}
        size={32}
      />
    </KeyboardAwareScrollView>
  );
  //  return <BeforeLoginWrapperView icon={renderIcon} layoutView={renderLogin} />;
};
const mapStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  doSignUpUser: doSignUpUser,
  doSaveUser: doSaveUser,
  doSaveToken: doSaveToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

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
  loginOrSignUpText: {
    fontFamily: fonts.InterRegular,
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
