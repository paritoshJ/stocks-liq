import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {themeProvide} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import EmptyPageView from '../../common/EmptyPageView';
import ItemBigSVG from '../../assets/svgs/ItemBigSVG';
const ExpenseScreen = props => {
  const renderSvgIcon = () => {
    return <ItemBigSVG color={themeProvide().primary} />;
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          title={I18n.t('expenseTabName')}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          logoToolbarType={true}
        />
        <EmptyPageView
          icon={renderSvgIcon}
          title={I18n.t('noItemTitle', {tabName: I18n.t('expenseTabName')})}
          message={I18n.t('noItemAddText', {tabName: I18n.t('expenseTabName')})}
          buttonTitle={`+ ${I18n.t('expenseTabName')}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExpenseScreen;
const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().page_back},
  safeView: {flex: 1, backgroundColor: themeProvide().primary_back},
});
