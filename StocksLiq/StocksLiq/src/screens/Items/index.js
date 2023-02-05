import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  getLanguage,
  isArrayNullOrEmpty,
  kFormatter,
  themeProvide,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import EmptyPageView from '../../common/EmptyPageView';
import ItemBigSVG from '../../assets/svgs/ItemBigSVG';
import SearchSvgIcon from '../../assets/svgs/SearchSvgIcon';
import {doGetCategory, doSaveCategory} from './Action';
import {connect} from 'react-redux';

import {store} from '../../store/configureStore';
import TabHeader from '../../common/TabHeader';
import {FlatList} from 'react-native-gesture-handler';
import ItemRow from './ItemRow';
import FilterSvgIcon from '../../assets/svgs/FilterSvgIcon';
import {TextInput} from 'react-native';

import RenderModal from '../../common/RenderModal';
import CheckBoxPlain from '../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../assets/svgs/CheckBoxWithTick';
import ThemeButton from '../../common/ThemeButton';
import Loader from '../../common/loader/Loader';

const ItemsScreen = props => {
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [salectedTabId, setSelectedTabId] = useState(null);
  const [categoriesTabs, setCategoriesTabs] = useState([]);
  const [listData, setListData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [loadingFooter, setLoadingFooter] = useState(false);
  const [filterSheetVisible, setFilterSheetVisile] = useState(false);
  const [searchText, setSearchText] = useState('');
  // const refRBSheet = useRef();
  const sheetRef = React.createRef();
  let pageSize = 10;
  let searchString = useRef('');
  let pageNo = useRef(1);
  let totalPage = useRef(2000);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);

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
              count={kFormatter(listData.length)}
              onPress={() => {
                setSelectedTabId(el.cat_id);
              }}
            />
          );
        })}
      </View>
    );
  };
  const flatListItemSeparator = () => {
    return <View />;
  };
  const renderFlatList = () => {
    return (
      <FlatList
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingBottom: 20,
          justifyContent: 'center',
        }}
        data={listData}
        extraData={listData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={flatListItemSeparator}
        showsVerticalScrollIndicator={false}
        initialNumToRender={listData.length}
        ListFooterComponent={renderFlatListFooter()}
        ListHeaderComponent={renderFlatListHeader()}
        onEndReachedThreshold={0.8}
        onEndReached={memoizedhandleLoadMore}
        onScrollBeginDrag={Keyboard.dismiss}
        renderItem={({item, index}) => (
          <ItemRow
            item={item}
            onItemClick={() => {}}
            onMoreIconClick={() => {}}
          />
        )}
      />
    );
  };
  const _onChangeTexts = value => {
    if (value.trim().length > 2) {
      searchString.current = value.trim();
      pageNo.current = 1;
      // callApi(false);
    } else {
      searchString.current = '';
      if (value.trim().length === 0) {
        pageNo.current = 1;
        // callApi(false);
      }
    }
  };
  const renderFlatListHeader = () => {
    return (
      <View style={styles.searchMainView}>
        <View style={styles.inputViewStyle}>
          <SearchSvgIcon />
          <TextInput
            placeholder={I18n.t('search')}
            value={searchText}
            style={styles.inputStyle}
            placeholderColor={themeProvide().borderBlack}
            onChangeText={value1 => {
              _onChangeTexts(value1);
              setSearchText(value1);
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            onFilterClick();
          }}
          style={styles.filterView}>
          <FilterSvgIcon />
        </TouchableOpacity>
      </View>
    );
  };
  const onFilterClick = () => {
    setFilterSheetVisile(true);
  };

  const renderFlatListFooter = () => {};
  const memoizedhandleLoadMore = () => {
    if (!loadingFooter && totalPage.current > pageNo.current) {
      pageNo.current += 1;
      // this.setState({ loadingFooter: true });
      setLoadingFooter(!loadingFooter);
      // callApi(true);
    } else if (totalPage.current === pageNo.current && loadingFooter) {
      setLoadingFooter(!loadingFooter);
    }
  };

  const renderCheckBoxItem = (el, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(index);
          // setItemTypeArr(current =>
          //   current.map((obj, i) => {
          //     if (i === index) {
          //       return {...obj, check: !obj.check};
          //     }
          //     return obj;
          //   }),
          // );
        }}
        style={styles.priceCheckStyle}>
        {el?.check ? <CheckBoxPlain /> : <CheckBoxWithTick />}
        <Text style={styles.checkTextStyle}>{el?.lang_name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItemTypeInput = () => {
    let checkedItem = [1, 2, 3, 4].filter(item => {
      return item.check;
    });
    return (
      <View style={{marginTop: 16}}>
        {[1, 2, 3, 4].map((el, index) => {
          return renderCheckBoxItem(el, index);
        })}
      </View>
    );
  };
  const renderFilterSheet = () => {
    return (
      <RenderModal
        onDismiss={() => {
          setFilterSheetVisile(false);
        }}
        visible={filterSheetVisible}>
        <View style={styles.filterViewStyle}>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '900',
              fontSize: 44,
              textAlign: 'center',
              color: themeProvide().black,
            }}>
            {'Filter'}
          </Text>
          <View style={styles.filterInnerStyle} />
          {renderItemTypeInput()}
          {renderFilterButtonView()}
        </View>
      </RenderModal>
    );
  };
  const renderFilterButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyleCancel]}
          onPress={() => {
            setFilterSheetVisile(false);
          }}
          buttonTitle={I18n.t('cancel')}
        />
        <ThemeButton
          buttonstyle={[styles.buttonstyleApply]}
          onPress={() => {
            setFilterSheetVisile(false);
          }}
          buttonTitle={I18n.t('apply')}
        />
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
        {isEmptyPage ? renderEmptyPage() : renderFlatList()}
      </View>
      {renderFilterSheet()}
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
  inputStyle: {
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 8,
    fontFamily: fonts.InterRegular,
  },
  inputViewStyle: {
    flex: 1,
    backgroundColor: themeProvide().white,
    borderColor: themeProvide().borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  searchMainView: {
    marginTop: 8,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  filterView: {
    backgroundColor: themeProvide().primary,
    borderRadius: 8,
    marginLeft: 12,
    padding: 12,
  },
  checkTextStyle: {
    color: themeProvide().black,
    fontSize: 14,
    marginHorizontal: 18,
    fontWeight: '500',
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
  },
  buttonstyleCancel: {
    flex: 1,
    marginVertical: 24,
    marginRight: 8,
  },
  buttonstyleApply: {
    flex: 1,
    marginVertical: 24,
    marginLeft: 8,
  },
  filterInnerStyle: {
    height: 1,
    marginVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  filterViewStyle: {paddingHorizontal: 24, paddingVertical: 16},
});
