import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  isStringNotNull,
  showMessageAlert,
  themeProvide,
} from '../../../util/globalMethods';
import ToolbarHeader from '../../../common/ToolbarHeader';
import I18n from '../../../localization';
import {fonts} from '../../../../assets/fonts/fonts';
import {doGetUserProfile} from '../../Profile/Action';
import {connect} from 'react-redux';
import Loader from '../../../common/loader/Loader';
import ProfileSvg from '../../../assets/svgs/ProfileSvg';
import ReferFriendSvg from '../../../assets/svgs/ReferFriendSvg';
import ThemeButton from '../../../common/ThemeButton';
import {store} from '../../../store/configureStore';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput, Checkbox} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBoxPlain from '../../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../../assets/svgs/CheckBoxWithTick';

const AddItemScreen = props => {
  const CategoryArr = [
    {label: 'English', value: '1'},
    {label: 'Desi', value: '2'},
  ];
  const SubCategoryArr = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];
  const [productName, setProductName] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [halfPrice, setHalfPrice] = useState('');
  const [quaterPrice, setQuaterPrice] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [isFullPrice, setIsFullPrice] = useState(true);
  const [isHalfPrice, setIsHalfPrice] = useState(false);
  const [isQuaterPrice, setIsQuaterPrice] = useState(false);

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const renderItemType = () => {
    return (
      <>
        <Text style={styles.storeText}>{I18n.t('itemType')}</Text>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          {renderCheckBoxItem(isFullPrice, 'fullPrice', I18n.t('fullType'))}
          {renderCheckBoxItem(isHalfPrice, 'halfPrice', I18n.t('halfType'))}
          {renderCheckBoxItem(
            isQuaterPrice,
            'quaterPrice',
            I18n.t('quaterType'),
          )}
        </View>
      </>
    );
  };
  const renderCheckBoxItem = (check, priceType, name) => {
    return (
      <TouchableOpacity
        onPress={() => {
          priceType === 'fullPrice'
            ? setIsFullPrice(check)
            : priceType === 'halfPrice'
            ? setIsHalfPrice(!check)
            : setIsQuaterPrice(!check);
        }}
        style={styles.priceCheckStyle}>
        {check ? <CheckBoxPlain /> : <CheckBoxWithTick />}
        <Text style={styles.checkTextStyle}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderDevider = () => {
    return <View style={styles.renderDevider} />;
  };

  const onSavePress = () => {
    let msg = '';
    if (!isStringNotNull(category)) {
      msg = I18n.t('selectCategoryError');
    } else if (!isStringNotNull(subCategory)) {
      msg = I18n.t('selectSubCategoryError');
    } else if (!isStringNotNull(productName)) {
      msg = I18n.t('productNameError');
    } else if (isFullPrice && !isStringNotNull(fullPrice)) {
      msg = I18n.t('fullPriceError');
    } else if (isHalfPrice && !isStringNotNull(halfPrice)) {
      msg = I18n.t('halfPriceError');
    } else if (isQuaterPrice && !isStringNotNull(quaterPrice)) {
      msg = I18n.t('quaterPriceError');
    }
    if (isStringNotNull(msg)) {
      showMessageAlert(msg);
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
    if (key === 'productName') {
      setProductName(value);
    } else if (key === 'fullPrice') {
      setFullPrice(value);
    } else if (key === 'halfPrice') {
      setHalfPrice(value);
    } else if (key === 'quaterPrice') {
      setQuaterPrice(value);
    }
  };
  const renderInputView = (label, value, key) => {
    return (
      <View style={styles.renderInputView}>
        <TextInput
          label={label}
          placeholder={`Enter ${label}`}
          value={value}
          dense={false}
          mode={'outlined'}
          style={styles.inputStyle}
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
    if ((key = 'category')) {
      setCategory(value);
    }
    if ((key = 'subCategory')) {
      setSubCategory(value);
    }
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().white}
          title={I18n.t('addItems')}
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
            {renderDropDownView(
              I18n.t('subCategory'),
              'subCategory',
              subCategory,
              SubCategoryArr,
            )}
            {renderInputView(I18n.t('productName'), productName, 'productName')}
            {renderItemType()}
            {isFullPrice &&
              renderInputView(I18n.t('fullPrice'), fullPrice, 'fullPrice')}
            {isHalfPrice &&
              renderInputView(I18n.t('halfPrice'), halfPrice, 'halfPrice')}
            {isQuaterPrice &&
              renderInputView(
                I18n.t('quaterPrice'),
                quaterPrice,
                'quaterPrice',
              )}

            {renderButtonView()}
            <Loader
              loading={isLoading}
              isTransparent={true}
              color={themeProvide().primary}
              size={32}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  doGetUserProfile: doGetUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen);

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
