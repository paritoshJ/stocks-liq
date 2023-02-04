import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getLanguage,
  isArrayNullOrEmpty,
  themeProvide,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import EmptyPageView from '../../common/EmptyPageView';
import ItemBigSVG from '../../assets/svgs/ItemBigSVG';
import {doGetCategory, doSaveCategory} from './Action';
import {connect} from 'react-redux';

import {store} from '../../store/configureStore';
import TabHeader from '../../common/TabHeader';
const ItemsScreen = props => {
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [salectedTabId, setSelectedTabId] = useState(null);
  const [categoriesTabs, setCategoriesTabs] = useState([]);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (isArrayNullOrEmpty(store?.getState()?.ItemReducer?.categoryData)) {
      getCategory();
    } else {
      setCategoriesTabs([...store?.getState()?.ItemReducer?.categoryData]);
      setSelectedTabId(store?.getState()?.ItemReducer?.categoryData[0].cat_id);
    }
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
          setCategoriesTabs([...data]);
          setSelectedTabId(data[0].cat_id);
        }, 1000);
      },
    });
  };
  const renderSvgIcon = () => {
    return <ItemBigSVG color={themeProvide().primary} />;
  };

  const renderEmptyPage = () => {
    return (
      <EmptyPageView
        icon={renderSvgIcon}
        title={I18n.t('noItemTitle', {tabName: I18n.t('itemsTabName')})}
        message={I18n.t('noItemAddText', {tabName: I18n.t('itemsTabName')})}
        buttonTitle={`+ ${I18n.t('itemsTabName')}`}
        onAddClick={() => {
          props.navigation.navigate('AddItemScreen');
        }}
      />
    );
  };
  const renderTopTab = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: themeProvide().primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        horizontal>
        {categoriesTabs.map((el, index) => {
          return (
            <TabHeader
              isSelected={el.cat_id === salectedTabId}
              title={el.lang_name}
              count={listData.length}
              onPress={() => {
                setSelectedTabId(el.cat_id);
              }}
            />
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          title={I18n.t('itemsTabName')}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          logoToolbarType={true}
        />
        {renderTopTab()}
        {!isEmptyPage && renderEmptyPage()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().page_back},
  safeView: {flex: 1, backgroundColor: themeProvide().primary_back},
});
