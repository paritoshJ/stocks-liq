import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getLanguage,
  isStringNotNull,
  showMessageAlert,
  themeProvide,
} from '../../../util/globalMethods';
import ToolbarHeader from '../../../common/ToolbarHeader';
import I18n from '../../../localization';
import {fonts} from '../../../../assets/fonts/fonts';
import {connect} from 'react-redux';
import ThemeButton from '../../../common/ThemeButton';
import {store} from '../../../store/configureStore';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput, Checkbox} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBoxPlain from '../../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../../assets/svgs/CheckBoxWithTick';
import {doAddWalletRequest} from '../Action';
import Loader from '../../../common/loader/Loader';

const RedeemRequestScreen = props => {
  const [redeemAmount, setRedeemAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const upiRegex = '/^[w.-]+@[w.-]+$/';
  const totalAmount = props?.route?.params?.totalAmount;

  const doAddWalletRequest = () => {
    setIsLoading(true);
    props.doAddWalletRequest({
      paramData: {
        amount: redeemAmount,
        upi_id: upiId,
      },
      onSuccess: (isSuccess, status, data) => {
        setIsLoading(false);
        showMessageAlert(data?.message, () => {
          if (isSuccess) {
            props.navigation.goBack();
            props?.route?.params?.getOnAddRedeemRequest();
          }
        });
      },
    });
  };
  const renderDevider = () => {
    return <View style={styles.renderDevider} />;
  };

  const onSavePress = () => {
    let msg = '';
    if (!isStringNotNull(redeemAmount)) {
      msg = I18n.t('commonEmptyError', {
        label: I18n.t('redeemAmount').toLowerCase(),
      });
    } else if (!isStringNotNull(upiId)) {
      msg = I18n.t('commonEmptyError', {
        label: I18n.t('upiId').toLowerCase(),
      });
    } else if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      msg = I18n.t('invalidUpi');
    } else if (totalAmount < Number(redeemAmount)) {
      msg = I18n.t('invalidAmount');
    }
    if (isStringNotNull(msg)) {
      showMessageAlert(msg);
    } else {
      doAddWalletRequest();
    }
  };
  const renderButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyle]}
          textStyle={styles.buttonTextstyle}
          // disabled={totalAmount < redeemAmount}
          onPress={() => {
            // console.log(totalAmount < Number(redeemAmount));
            onSavePress();
          }}
          buttonTitle={I18n.t('save')}
        />
      </View>
    );
  };
  const _onChangeText = (key, value) => {
    if (key === 'redeemAmount') {
      setRedeemAmount(value);
    } else if (key === 'upiId') {
      setUpiId(value);
    }
  };
  const renderInputView = (label, placeholder, value, key, multiline) => {
    return (
      <View style={styles.renderInputView}>
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value}
          dense={false}
          mode={'outlined'}
          style={[styles.inputStyle, multiline && {minHeight: 100}]}
          multiline={multiline}
          error={false}
          theme={{
            colors: {
              primary: themeProvide().black,
              error: themeProvide().primary,
            },
          }}
          keyboardType={key === 'redeemAmount' ? 'number-pad' : 'default'}
          placeholderColor={themeProvide().borderBlack}
          activeUnderlineColor={themeProvide().black}
          underlineColorAndroid={renderDevider()}
          onChangeText={value1 => _onChangeText(key, value1)}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().white}
          title={I18n.t('redeem_request')}
          onPress={() => {
            props.navigation.goBack();
          }}
          logoToolbarType={false}
        />
        <KeyboardAwareScrollView
          enableOnAndroid={Platform.OS === 'android'}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}>
          <View style={styles.paddingView}>
            {renderInputView(
              I18n.t('redeemAmount'),
              I18n.t('commonPlaceholder', {label: I18n.t('redeemAmount')}),
              redeemAmount,
              'redeemAmount',
              false,
            )}
            {renderInputView(
              I18n.t('upiId'),
              I18n.t('commonPlaceholder', {label: I18n.t('upiId')}),
              upiId,
              'upiId',
              false,
            )}
            {renderButtonView()}
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Loader
        loading={isLoading}
        isTransparent={true}
        color={themeProvide().primary}
        size={32}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    ItemReducer: state.ItemReducer,
  };
};

const mapDispatchToProps = {
  doAddWalletRequest: doAddWalletRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedeemRequestScreen);

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().white},
  safeView: {flex: 1, backgroundColor: themeProvide().white},
  storeExampleText: {
    color: themeProvide().black,
    alignSelf: 'center',
    marginHorizontal: 10,
    opacity: 0.5,
    fontSize: 14,
    marginVertical: 4,
    fontWeight: '400',
    justifyContent: 'center',
  },
  renderDevider: {
    backgroundColor: themeProvide().black,
    opacity: 0.06,
    height: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  paddingView: {
    paddingHorizontal: 20,
  },
  renderInputView: {marginVertical: 12},
  inputLabel: {fontSize: 12},
  inputValue: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
    fontFamily: fonts.InterRegular,
  },
  buttonView: {
    flexDirection: 'row',
  },

  storeText: {
    color: themeProvide().black,
    fontSize: 16,
    marginTop: 8,
    fontWeight: '700',
    justifyContent: 'center',
  },
  checkTextStyle: {
    color: themeProvide().black,
    fontSize: 14,
    marginHorizontal: 18,
    fontWeight: '500',
    justifyContent: 'center',
  },
  buttonstyle: {
    backgroundColor: themeProvide().primary,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginTop: 24,
    borderColor: themeProvide().primary,
    borderWidth: 1,
  },
  buttonTextstyle: {
    color: themeProvide().white,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.InterRegular,
    paddingHorizontal: 0,
  },
  priceCheckStyle: {flex: 1, flexDirection: 'row', alignItems: 'center'},
});
