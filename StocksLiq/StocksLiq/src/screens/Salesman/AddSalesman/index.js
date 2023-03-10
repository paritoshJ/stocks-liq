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
import {doAddSalesMan} from '../Action';
import Loader from '../../../common/loader/Loader';

const AddSalesmanScreen = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const doAddSalesManApi = () => {
    setIsLoading(true);
    props.doAddSalesMan({
      paramData: {
        first_name: firstName,
        last_name: lastName,
        mobile_number: mobileNumber,
      },
      onSuccess: (isSuccess, status, data) => {
        setIsLoading(false);
        if (isSuccess) {
          props.navigation.goBack();
          props?.route?.params?.onAddSalesmanPress();
        } else {
          showMessageAlert(data?.message);
        }
      },
    });
  };
  const renderDevider = () => {
    return <View style={styles.renderDevider} />;
  };

  const onSavePress = () => {
    let msg = '';
    if (!isStringNotNull(firstName)) {
      msg = I18n.t('commonEmptyError', {
        label: I18n.t('firstNameSales').toLowerCase(),
      });
    } else if (!isStringNotNull(lastName)) {
      msg = I18n.t('commonEmptyError', {
        label: I18n.t('lastNameSales').toLowerCase(),
      });
    } else if (!isStringNotNull(mobileNumber)) {
      msg = I18n.t('commonEmptyError', {
        label: I18n.t('mobileNumber').toLowerCase(),
      });
    } else if (mobileNumber.length < 10) {
      msg = I18n.t('invalidMobile');
    } else if (mobileNumber.length > 12) {
      msg = I18n.t('invalidMobile');
    }
    if (isStringNotNull(msg)) {
      showMessageAlert(msg);
    } else {
      doAddSalesManApi();
    }
  };
  const renderButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyle]}
          textStyle={styles.buttonTextstyle}
          onPress={() => {
            onSavePress();
          }}
          buttonTitle={I18n.t('save')}
        />
      </View>
    );
  };
  const _onChangeText = (key, value) => {
    if (key === 'firstName') {
      setFirstName(value);
    } else if (key === 'lastName') {
      setLastName(value);
    } else if (key === 'mobileNumber') {
      setMobileNumber(value);
    }
  };
  const renderInputView = (label, placeholder, value, key, multiline, keyboardType) => {
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
          maxLength={keyboardType === 'phone-pad' ? 10 : 100}
          keyboardType={keyboardType}
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
          title={I18n.t('addSalesman')}
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
              I18n.t('firstNameSales'),
              I18n.t('commonPlaceholder', {label: I18n.t('firstNameSales')}),
              firstName,
              'firstName',
              false,
              'default',
            )}
            {renderInputView(
              I18n.t('lastNameSales'),
              I18n.t('commonPlaceholder', {label: I18n.t('lastNameSales')}),
              lastName,
              'lastName',
              false,
              'default',
            )}
            {renderInputView(
              I18n.t('mobileNumber'),
              I18n.t('commonPlaceholder', {label: I18n.t('mobileNumber')}),
              mobileNumber,
              'mobileNumber',
              false,
              'phone-pad',
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
  doAddSalesMan: doAddSalesMan,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSalesmanScreen);

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
