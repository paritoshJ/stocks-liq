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
import {
  doAddItem,
  doGetSubCategory,
  doGetSubCategoryType,
} from '../../Items/Action';
import Loader from '../../../common/loader/Loader';

const AddExpenseScreen = props => {
  const CategoryArr = store?.getState()?.ItemReducer?.categoryData;
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseRemark, setExpenseRemark] = useState('');
  const [SubCategoryArr, setSubCategoryArr] = useState([]);
  const [itemTypeArr, setItemTypeArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  const renderItemType = () => {
    return (
      <>
        <Text style={styles.storeText}>{I18n.t('itemType')}</Text>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          {itemTypeArr.map((el, index) => {
            return renderCheckBoxItem(el, index);
          })}
        </View>
      </>
    );
  };
  const renderItemTypeInput = () => {
    let checkedItem = itemTypeArr.filter(item => {
      return item.check;
    });
    return (
      <>
        {checkedItem.map((el, index) => {
          return renderInputView(
            el.lang_name,
            isStringNotNull(el.price) ? el.price : '',
            el.type_id,
          );
        })}
      </>
    );
  };
  const renderCheckBoxItem = (el, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(index);
          setItemTypeArr(current =>
            current.map((obj, i) => {
              if (i === index) {
                return {...obj, check: !obj.check};
              }
              return obj;
            }),
          );
        }}
        style={styles.priceCheckStyle}>
        {el?.check ? <CheckBoxPlain /> : <CheckBoxWithTick />}
        <Text style={styles.checkTextStyle}>{el?.lang_name}</Text>
      </TouchableOpacity>
    );
  };
  const getSubCategory = parent => {
    props.doGetSubCategory({
      paramData: {cat_id: parent, lang: getLanguage()},
      onSuccess: (isSuccess, status, data) => {
        if (isSuccess) {
          data?.forEach(element => {
            element['value'] = element.cat_id;
            element['label'] = element.lang_name;
          });
          setTimeout(() => {
            setSubCategoryArr(data);
            console.log(data);
          }, 1000);
        }
      },
    });
  };
  const getSubCategoryType = cate_id => {
    props.doGetSubCategoryType({
      paramData: {cat_id: cate_id, lang: getLanguage()},
      onSuccess: (isSuccess, status, data) => {
        if (isSuccess) {
          setItemTypeArr(data);
          console.log('CategoryType', data);
        }
      },
    });
  };
  const doAddItemApi = () => {
    setIsLoading(true);
    props.doAddItem({
      paramData: {
        expense_name: expenseName,
        expense_amount: expenseAmount,
        expense_remark: expenseRemark,
        exp_id: category,
      },
      onSuccess: (isSuccess, status, data) => {
        setIsLoading(false);
        if (isSuccess) {
          props.navigation.goBack();
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
    } else if (!isStringNotNull(expenseRemark)) {
      msg = I18n.t('expenseRemarkError');
    }
    if (isStringNotNull(msg)) {
      showMessageAlert(msg);
    } else {
      // doAddItemApi();
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
          placeholderColor={themeProvide().borderBlack}
          activeUnderlineColor={themeProvide().black}
          underlineColorAndroid={renderDevider()}
          onChangeText={value1 => _onChangeText(key, value1)}
        />
      </View>
    );
  };
  const onItemSelect = (key, value) => {
    if (key === 'category') {
      setCategory(value);
      getSubCategory(value);
      setSubCategoryArr([]);
      setItemTypeArr([]);
      setSubCategory('');
    } else if (key === 'subCategory') {
      setSubCategory(value);
      getSubCategoryType(value);
      setItemTypeArr([]);
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
              I18n.t('category'),
              'category',
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
    ItemReducer: state.ItemReducer,
  };
};

const mapDispatchToProps = {
  doGetSubCategory: doGetSubCategory,
  doGetSubCategoryType: doGetSubCategoryType,
  doAddItem: doAddItem,
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
