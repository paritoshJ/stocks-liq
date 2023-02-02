import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {themeProvide} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';

const DashboardScreen = props => {
  useEffect(() => {
    // props.navigation.openDrawer();
  }, []);
  const renderRecords = (label, item) => {
    return (
      <>
        <Text>{label}</Text>
        <View style={{flexDirection: 'row', marginTop: 12}}>
          {renderCard(I18n.t('totalSales'), '$1200')}
          {renderCardGap()}
          {renderCard(I18n.t('totalExpens'), '$1200')}
        </View>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          {renderCard(I18n.t('totalCommission'), '$1200')}
          {renderCardGap()}
          {renderCard(I18n.t('totalCollection'), '$1200')}
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

export default DashboardScreen;
const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: '900',
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
  },
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
