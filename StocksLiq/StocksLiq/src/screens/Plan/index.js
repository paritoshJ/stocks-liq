import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LogoSvg from '../../assets/svgs/logoSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {themeProvide} from '../../util/globalMethods';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import ThemeButton from '../../common/ThemeButton';

const PlanScreen = props => {
  const renderWelcomeText = () => {
    return <Text style={styles.welcomeText}>{I18n.t('planDescription')}</Text>;
  };
  const onLoginPress = () => {
    // props.navigation.navigate('OtpScreen',{});
  };
  const renderTrialButton = () => {
    return (
      <ThemeButton
        onPress={() => onLoginPress()}
        buttonstyle={styles.trialButton}
        textStyle={{color: themeProvide().primary}}
        buttonTitle={I18n.t('freetrialDays', {noOfDays: '7'})}
      />
    );
  };
  const renderButton = () => {
    return (
      <ThemeButton
        onPress={() => onLoginPress()}
        buttonTitle={I18n.t('continue')}
      />
    );
  };
  const deviderView = () => {
    return <View style={styles.lineView} />;
  };
  const renderPlanDetails = text => {
    return (
      <View style={styles.planDetailMainView}>
        <View style={styles.circleViewStyle} />
        <Text style={styles.tipsTextStyle}>{text}</Text>
      </View>
    );
  };
  const renderPlanView = () => {
    return (
      <View style={styles.planViewStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.yearlyPlaneStyle}>{I18n.t('yearly')}</Text>
            <Text style={styles.addSaleStyle}>
              {I18n.t('salesman', {noOfSalesman: '10'})}
            </Text>
          </View>
          <View>
            <Text style={[styles.yearlyPlaneStyle, , {textAlign: 'right'}]}>
              ₹ 1000
            </Text>
            <Text style={[styles.addSaleStyle, {textAlign: 'right'}]}>
              {I18n.t('everyYear')}
            </Text>
          </View>
        </View>
        {deviderView()}
        {renderPlanDetails(I18n.t('manageItemTips'))}
        {renderPlanDetails(I18n.t('manageInventoryTips'))}
        {renderPlanDetails(I18n.t('manageExpenseTips'))}
        {renderPlanDetails(I18n.t('manageSalesreportTips'))}
        {renderTrialButton()}
      </View>
    );
  };

  const renderLoginORSignUpView = () => {
    return (
      <View style={styles.loginSignupView}>
        <Text style={styles.loginOrSignUpText}>
          {I18n.t('planDescriptionText')}
        </Text>
      </View>
    );
  };
  const renderPlan = () => {
    return (
      <View>
        {renderWelcomeText()}
        {renderLoginORSignUpView()}
        {renderPlanView()}
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
        <View style={styles.secondView}>{renderPlan()}</View>
      </View>
    </KeyboardAwareScrollView>
  );
  //  return <BeforeLoginWrapperView icon={renderIcon} layoutView={renderLogin} />;
};

export default PlanScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: themeProvide().white,
  },
  trialButton:{
    backgroundColor: 'rgba(250, 134, 25, 0.12)',
    paddingVertical: 10,
  },
  planDetailMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginVertical: 4,
  },
  circleViewStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: themeProvide().primary,
  },
  tipsTextStyle: {
    color: themeProvide().black,
    letterSpacing: 0.01,
    marginHorizontal: 12,
    fontFamily: fonts.InterRegular,
    fontSize: 12,
    fontWeight: '400',
  },
  planViewStyle: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginVertical: 10,
  },
  yearlyPlaneStyle: {
    fontFamily: fonts.InterRegular,
    fontWeight: '800',
    fontSize: 16,
  },
  addSaleStyle: {
    fontFamily: fonts.InterRegular,
    fontWeight: '600',
    fontSize: 12,
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
    justifyContent: 'center',
  },
  lineView: {
    height: 0.5,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
