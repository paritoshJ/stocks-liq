import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  isArrayNullOrEmpty,
  getLanguage,
  themeProvide,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';
import {doGetCategory, doSaveCategory} from '../Items/Action';
import {connect} from 'react-redux';
import {store} from '../../store/configureStore';

const DashboardScreen = props => {
  useEffect(() => {
    // props.navigation.openDrawer();
    if (isArrayNullOrEmpty(store?.getState()?.ItemReducer?.categoryData)) {
      getCategory();
    }
    getCategory();
  }, []);
  const getCategory = () => {
    props.doGetCategory({
      paramsData: {lang: getLanguage()},
      onSuccess: (isSuccess, status, data) => {
        data?.forEach(element => {
          element['value'] = element.cat_id;
          element['label'] = element.lang_name;
        });
        setTimeout(() => {
          props.doSaveCategory(data ? data : []);
        }, 1000);
      },
    });
  };
  const renderRecords = (label, item) => {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <View style={{flexDirection: 'row', marginTop: 12}}>
          {renderCard(I18n.t('totalSales'), '$12910')}
          {renderCardGap()}
          {renderCard(I18n.t('totalExpens'), '$2910')}
        </View>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          {renderCard(I18n.t('totalCommission'), '$910')}
          {renderCardGap()}
          {renderCard(I18n.t('totalCollection'), '$12910')}
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
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={true}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          logoToolbarType={true}
        />
        <View style={styles.titleView}>
          {renderRecords(I18n.t('today'), null)}
          {renderCardGap()}
          {renderRecords(I18n.t('allTime'), null)}
        </View>
      </View>
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
