import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';
import {connect} from 'react-redux';
import {doSaveUser, doSaveToken, setLoggedIn} from '../Login/Action';

const RegisterSuccessScreen = props => {
  const renderWelcomeText = () => {
    return (
      <Text style={styles.welcomeText}>
        {I18n.t('helloUserText', {
          username: props?.route?.params?.userData?.first_name,
        })}
      </Text>
    );
  };
  const renderLoginORSignUpView = () => {
    return (
      <View style={styles.loginSignupView}>
        <Text style={styles.loginOrSignUpText}>{I18n.t('successText')}</Text>
      </View>
    );
  };
  const onGoToDashboard = () => {
    props.doSaveToken(props?.route?.params?.userData?.token);
    props.doSaveUser(props?.route?.params?.userData);
    setTimeout(() => {
      props.setLoggedIn(true);
    }, 1000);
  };
  const renderButton = () => {
    return (
      <ThemeButton
        buttonstyle={{width: 194, alignSelf: 'center'}}
        onPress={onGoToDashboard}
        buttonTitle={I18n.t('gotoDashboard')}
      />
    );
  };
  const renderOtpView = () => {
    return (
      <View>
        {renderWelcomeText()}
        {renderLoginORSignUpView()}
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
const mapStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  doSaveUser: doSaveUser,
  doSaveToken: doSaveToken,
  setLoggedIn: setLoggedIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterSuccessScreen);

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
