import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import EmptyPageView from '../../common/EmptyPageView';
import ItemBigSVG from '../../assets/svgs/ItemBigSVG';

import {
  getLanguage,
  isArrayNullOrEmpty,
  kFormatter,
  themeProvide,
} from '../../util/globalMethods';
import SearchSvgIcon from '../../assets/svgs/SearchSvgIcon';

import {store} from '../../store/configureStore';
import TabHeader from '../../common/TabHeader';
import {FlatList} from 'react-native-gesture-handler';
import InventoryRow from './InventoryRow';
import FilterSvgIcon from '../../assets/svgs/FilterSvgIcon';
import AddItemSVG from '../../assets/svgs/AddItemSVG';
import {TextInput} from 'react-native';
import {connect} from 'react-redux';

import RenderModal from '../../common/RenderModal';
import CheckBoxPlain from '../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../assets/svgs/CheckBoxWithTick';
import ThemeButton from '../../common/ThemeButton';
import Loader from '../../common/loader/Loader';
import {doGetItems} from '../Items/Action';

const InventoryScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [salectedTabId, setSelectedTabId] = useState(null);
  const [categoriesTabs, setCategoriesTabs] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [listData, setListData] = useState([]);
  const [loadingFooter, setLoadingFooter] = useState(false);
  const [filterSheetVisible, setFilterSheetVisile] = useState(false);
  const [searchText, setSearchText] = useState('');
  // const refRBSheet = useRef();
  let pageSize = 10;
  let searchString = useRef('');
  let pageNo = useRef(1);
  let totalPage = useRef(2000);

  const renderSvgIcon = () => {
    return <ItemBigSVG color={themeProvide().primary} />;
  };
  useEffect(() => {
    if (!isArrayNullOrEmpty(store?.getState()?.ItemReducer?.categoryData)) {
      setCategoriesTabs([...store?.getState()?.ItemReducer?.categoryData]);
      setSelectedTabId(store?.getState()?.ItemReducer?.categoryData[0].value);
    }
  }, []);
  useEffect(() => {
    getItemsApi(salectedTabId);
  }, [salectedTabId]);
  const resetItems = () => {
    setListData([]);
  };
  const getOnAddItem = () => {
    resetItems();
    getItemsApi(salectedTabId);
  };
  const getSubCategories = (cat_id, arr) => {
    let obj = arr.find(element => element?.language?.cat_id === cat_id);
    console.log('subcategories', obj?.subcategories);
    setSubCategories(obj?.subcategories);
  };
  // salectedTabId can be string or array;
  const getItemsApi = (salectedTabId, searchText) => {
    setLoading(true);
    props.doGetItems({
      paramData: {cat_id: salectedTabId, search_text: searchText},
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        if (isSuccess) {
          console.log('data', data);
          setListData(data.data);
        }
      },
    });
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
              isSelected={el.value === salectedTabId}
              title={el.label}
              count={kFormatter(listData.length)}
              onPress={() => {
                resetItems();
                setSelectedTabId(el.value);
                setTimeout(() => {
                  getSubCategories(el.value, categoriesTabs);
                }, 1000);
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
          <InventoryRow
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
      getItemsApi(salectedTabId, searchString.current);
    } else {
      searchString.current = '';
      if (value.trim().length === 0) {
        pageNo.current = 1;
        // callApi(false);
        getItemsApi(salectedTabId, searchString.current);
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
          console.log(index);
          setSubCategories(current =>
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
        <Text style={styles.checkTextStyle}>{el?.language?.lang_name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItemTypeInput = () => {
    return (
      <View style={{marginTop: 16}}>
        {subCategories.map((el, index) => {
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
            let checkedItemArr = subCategories.filter(item => {
              return item.check;
            });

            if (checkedItemArr.length > 0) {
              let arr = checkedItemArr.reduce((acc, d) => {
                acc.push(d.language.cat_id);
                return acc;
              }, []);
              console.log('checkedItemArr', checkedItemArr, arr);
              getItemsApi(arr);
            }
          }}
          buttonTitle={I18n.t('apply')}
        />
      </View>
    );
  };
  const renderAddButtom = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          goToAddinventory();
        }}
        style={styles.AddView}>
        <AddItemSVG />
      </TouchableOpacity>
    );
  };
  const goToAddinventory = () => {
    props.navigation.navigate('AddInventoryScreen', {
      getOnAddItem: getOnAddItem,
    });
  };
  const renderEmptyPage = () => {
    return (
      <EmptyPageView
        icon={renderSvgIcon}
        onAddClick={() => {
          goToAddinventory();
        }}
        title={I18n.t('noItemTitle', {tabName: I18n.t('inventoryTabName')})}
        message={I18n.t('noItemAddText', {
          tabName: I18n.t('inventoryTabName'),
        })}
        buttonTitle={`+ ${I18n.t('inventoryTabName')}`}
      />
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          title={I18n.t('inventoryTabName')}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          logoToolbarType={true}
        />
        {renderTopTab()}
        {isEmptyPage ? renderEmptyPage() : renderFlatList()}
      </View>
      {renderAddButtom()}
      {renderFilterSheet()}
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
  doGetItems: doGetItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryScreen);

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().page_back},
  safeView: {flex: 1, backgroundColor: themeProvide().primary_back},
  inputStyle: {
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 8,
    flex: 1,
    color: themeProvide().black,
    fontFamily: fonts.InterRegular,
  },
  inputViewStyle: {
    flex: 1,
    backgroundColor: themeProvide().white,
    borderColor: themeProvide().borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
  },
  searchMainView: {
    marginTop: 16,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
  },
  filterView: {
    backgroundColor: themeProvide().primary,
    borderRadius: 8,
    marginLeft: 12,
    padding: 12,
  },
  AddView: {
    backgroundColor: themeProvide().primary,
    borderRadius: 40,
    position: 'absolute',
    bottom: 16,
    right: 16,
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
  priceCheckStyle: {flexDirection: 'row', marginTop: 16, alignItems: 'center'},
  filterViewStyle: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: themeProvide().white,
  },
});
