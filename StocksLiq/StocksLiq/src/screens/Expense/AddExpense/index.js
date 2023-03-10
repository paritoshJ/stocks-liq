import {View, StyleSheet, SafeAreaView, Platform} from 'react-native';
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
import {doAddExpense} from '../Action';
import Loader from '../../../common/loader/Loader';

const AddExpenseScreen = props => {
  const CategoryArr = store?.getState()?.ExpenseReducer?.expenseTypeArray;
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseRemark, setExpenseRemark] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(
    props?.route?.params?.salectedTabId ?? null,
  );
  const doAddExpenseApi = () => {
    setIsLoading(true);
    props.doAddExpense({
      paramData: {
        exp_name: expenseName,
        amount: expenseAmount,
        remark: expenseRemark,
        exp_type: category,
      },
      onSuccess: (isSuccess, status, data) => {
        setIsLoading(false);
        if (isSuccess) {
          props.navigation.goBack();
          props?.route?.params?.getOnAddExpense();
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
    if (!isStringNotNull(category)) {
      msg = I18n.t('selectExpenseError');
    } else if (!isStringNotNull(expenseName)) {
      msg = I18n.t('expenseNameError');
    } else if (!isStringNotNull(expenseAmount)) {
      msg = I18n.t('expenseAmountError');
    } else if (expenseAmount <= 0) {
      msg = I18n.t('enterZeroPriceError', {type: I18n.t('expenseAmount')});
    } else if (!isStringNotNull(expenseRemark)) {
      msg = I18n.t('expenseRemarkError');
    }
    if (isStringNotNull(msg)) {
      showMessageAlert(msg);
    } else {
      doAddExpenseApi();
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
  const renderDropDownView = (placeholder, key, value, data) => {
    return (
      <View style={styles.renderInputView}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={item => {
            onItemSelect(key, item.value);
            // setIsFocus(false);
          }}
        />
      </View>
    );
  };
  const _onChangeText = (key, value) => {
    if (key === 'expenseName') {
      setExpenseName(value);
    } else if (key === 'expenseAmount') {
      setExpenseAmount(value);
    } else if (key === 'expenseRemark') {
      setExpenseRemark(value);
    }
  };
  const renderInputView = (
    label,
    placeholder,
    value,
    key,
    multiline,
    keybordType,
  ) => {
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
          keyboardType={key === 'expenseAmount' ? 'number-pad' : 'default'}
          placeholderColor={themeProvide().borderBlack}
          activeUnderlineColor={themeProvide().black}
          underlineColorAndroid={renderDevider()}
          onChangeText={value1 => _onChangeText(key, value1)}
        />
      </View>
    );
  };
  const onItemSelect = (key, value) => {
    if (key === 'selectExpense') {
      setCategory(value.toLowerCase());
    }
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().white}
          title={I18n.t('addExpense')}
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
            {renderDropDownView(
              I18n.t('selectExpense'),
              'selectExpense',
              category,
              CategoryArr,
            )}

            {renderInputView(
              I18n.t('expenseName'),
              I18n.t('expenseNamePlaceholder'),
              expenseName,
              'expenseName',
              false,
            )}
            {renderInputView(
              I18n.t('expenseAmount'),
              I18n.t('expenseAmountPlaceholder'),
              expenseAmount,
              'expenseAmount',
              false,
            )}
            {renderInputView(
              I18n.t('expenseRemark'),
              I18n.t('expenseRemarkPlaceholder'),
              expenseRemark,
              'expenseRemark',
              true,
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
    ExpenseReducer: state.ExpenseReducer,
  };
};

const mapDispatchToProps = {
  doAddExpense: doAddExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseScreen);

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
