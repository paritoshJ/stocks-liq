import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  isArrayNullOrEmpty,
  getLanguage,
  themeProvide,
  showMessageAlert,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import {doGetCategory, doSaveCategory} from '../Items/Action';
import {doGetDashbordValues} from './Action';
import {connect} from 'react-redux';
import {store} from '../../store/configureStore';
import Loader from '../../common/loader/Loader';

const DashboardScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // props.navigation.openDrawer();
    if (isArrayNullOrEmpty(store?.getState()?.ItemReducer?.categoryData)) {
      getCategory();
    }
    getCategory();
    getDashbordValues();
  }, []);
  const getCategory = () => {
    props.doGetCategory({
      paramsData: {lang: getLanguage()},
      onSuccess: (isSuccess, status, data) => {
        if (isSuccess && typeof data !== 'string') {
          data?.forEach(element => {
            element['value'] = element?.language?.cat_id;
            element['label'] = element?.language?.lang_name;
          });
          setTimeout(() => {
            props.doSaveCategory(data ? data : []);
          }, 1000);
        } else {
          showMessageAlert(data);
        }
      },
    });
  };
  const getDashbordValues = () => {
    setLoading(true);
    props.doGetDashbordValues({
      paramsData: {lang: getLanguage()},
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        console.log('doGetDashbordValues', data?.data);
        if (isSuccess && typeof data !== 'string') {
          setDashboardData(data?.data);
        } else {
          showMessageAlert(data);
        }
      },
    });
  };
  const renderRecords = (
    label,
    totalSale,
    totalExpens,
    totalCommission,
    totalCollection,
  ) => {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <View style={{flexDirection: 'row', marginTop: 12}}>
          {renderCard(I18n.t('totalSales'), totalSale)}
          {renderCardGap()}
          {renderCard(I18n.t('totalExpens'), totalExpens)}
        </View>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          {renderCard(I18n.t('totalCommission'), totalCommission)}
          {renderCardGap()}
          {renderCard(I18n.t('totalCollection'), totalCollection)}
        </View>
      </>
    );
  };
  const renderCardGap = () => {
    return <View style={styles.cardGap} />;
  };
  const renderCard = (totalType, price) => {
    return (
      <View style={styles.shadowView}>
        <Text style={styles.titleText}>{price}</Text>
        <Text style={styles.totalText}>{totalType}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeProvide().primary_back}
      />
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={true}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          logoToolbarType={true}
        />
        {dashboardData && (
          <View style={styles.titleView}>
            {renderRecords(
              I18n.t('today'),
              I18n.t('totalPrice', {price: `${dashboardData?.today_sales}`}),
              I18n.t('totalPrice', {price: `${dashboardData?.today_expenses}`}),
              I18n.t('totalPrice', {
                price: `${dashboardData?.today_commission}`,
              }),
              I18n.t('totalPrice', {
                price: `${
                  dashboardData?.today_sales +
                  dashboardData?.today_expenses +
                  dashboardData?.today_commission
                }`,
              }),
            )}
            {renderCardGap()}
            {renderRecords(
              I18n.t('allTime'),
              I18n.t('totalPrice', {price: `${dashboardData?.total_sales}`}),
              I18n.t('totalPrice', {price: `${dashboardData?.total_expenses}`}),
              I18n.t('totalPrice', {
                price: `${dashboardData?.total_commission}`,
              }),
              I18n.t('totalPrice', {
                price: `${
                  dashboardData?.total_sales +
                  dashboardData?.total_expenses +
                  dashboardData?.total_commission
                }`,
              }),
            )}
          </View>
        )}
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
  doGetCategory: doGetCategory,
  doSaveCategory: doSaveCategory,
  doGetDashbordValues: doGetDashbordValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: '900',
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
  },
  label: {fontSize: 14, fontFamily: fonts.InterRegular, fontWeight: '500'},
  totalText: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
  },
  cardGap: {
    width: 16,
    height: 16,
  },
  titleView: {flex: 1, padding: 16},
  mainView: {flex: 1, backgroundColor: themeProvide().page_back},
  safeView: {flex: 1, backgroundColor: themeProvide().primary_back},
  shadowView: {
    flex: 1,
    shadowColor: '#FA8619',
    shadowOffset: {width: 3, height: 6},
    shadowOpacity: 0.16,
    shadowRadius: 3,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: themeProvide().white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
