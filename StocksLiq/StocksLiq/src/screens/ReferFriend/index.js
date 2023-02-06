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
  getCurrenyPrice,
  getLanguage,
  isStringNotNull,
  showMessageAlert,
  themeProvide,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import {connect} from 'react-redux';
import ThemeButton from '../../common/ThemeButton';
import {store} from '../../store/configureStore';
import {
  doAddItem,
  doGetSubCategory,
  doGetSubCategoryType,
} from '../Items/Action';
import Loader from '../../common/loader/Loader';

const ReferFriendScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const doAddItemApi = () => {
    setIsLoading(true);
    props.doAddItem({
      paramData: {
        // expense_name: expenseName,
        // expense_amount: expenseAmount,
        // expense_remark: expenseRemark,
        // exp_id: category,
      },
      onSuccess: (isSuccess, status, data) => {
        setIsLoading(false);
        if (isSuccess) {
          props.navigation.goBack();
        }
      },
    });
  };

  const onSharePress = () => {
  };
  const renderButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyle]}
          textStyle={styles.buttonTextstyle}
          onPress={() => {
            onSharePress();
          }}
          buttonTitle={I18n.t('shareWithAFriend')}
        />
      </View>
    );
  };

  const renderInfo = price => {
    return (
      <View style={styles.renderInputView}>
        <Text style={styles.referTitle}>
          {I18n.t('inviteFriendAmount', {price: getCurrenyPrice(Number(500))})}
        </Text>
        <Text style={styles.referDesc}>
          {I18n.t('inviteFriendAmountDesc', {
            price: getCurrenyPrice(Number(500)),
          })}
        </Text>
        <Text style={styles.referCode}>
          {I18n.t('referalLabel')}{' '}
          <Text style={styles.actualCode}>
            {I18n.t('referalCode', {code: '4frt5'})}
          </Text>
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().white}
          title={I18n.t('refer_a_friend_menu')}
          onPress={() => {
            props.navigation.goBack();
          }}
          logoToolbarType={false}
        />

        <View style={styles.paddingView}>
          {renderInfo()}
          {renderButtonView()}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReferFriendScreen);

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().white},
  safeView: {flex: 1, backgroundColor: themeProvide().white},
  referTitle: {
    color: themeProvide().black,
    fontSize: 18,
    marginVertical: 4,
    fontWeight: '700',
  },
  referDesc: {
    color: themeProvide().black,
    fontSize: 14,
    marginVertical: 12,
    textAlign: 'center',
    fontWeight: '400',
  },
  referCode: {
    color: themeProvide().black,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
  },
  actualCode: {
    color: themeProvide().primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
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
  renderInputView: {marginVertical: 12, alignItems: 'center'},
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
