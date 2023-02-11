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
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  getLanguage,
  isArrayNullOrEmpty,
  kFormatter,
  showMessageAlert,
  themeProvide,
  twoOptionsAlertFunction,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import EmptyPageView from '../../common/EmptyPageView';
import ItemBigSVG from '../../assets/svgs/ItemBigSVG';
import SearchSvgIcon from '../../assets/svgs/SearchSvgIcon';
import {connect} from 'react-redux';

import {store} from '../../store/configureStore';
import TabHeader from '../../common/TabHeader';
import {FlatList} from 'react-native-gesture-handler';
import SalesmanRow from './SalesmanRow';
import FilterSvgIcon from '../../assets/svgs/FilterSvgIcon';
import AddItemSVG from '../../assets/svgs/AddItemSVG';
import {TextInput} from 'react-native';

import RenderModal from '../../common/RenderModal';
import CheckBoxPlain from '../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../assets/svgs/CheckBoxWithTick';
import ThemeButton from '../../common/ThemeButton';
import Loader from '../../common/loader/Loader';
import {doGetSalesMan, doDeleteSalesMan} from './Action';

const SalesmanScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [salectedTabId, setSelectedTabId] = useState(null);
  const [categoriesTabs, setCategoriesTabs] = useState([]);
  const [listData, setListData] = useState([]);
  const [loadingFooter, setLoadingFooter] = useState(false);
  const [filterSheetVisible, setFilterSheetVisile] = useState(false);
  const [searchText, setSearchText] = useState('');
  // const refRBSheet = useRef();
  let pageSize = 10;
  let searchString = useRef('');
  let pageNo = useRef(1);
  let totalPage = useRef(2000);
  let totalRecords = useRef(0);

  useEffect(() => {
    getSalesmanApi();
  }, []);

  const renderSvgIcon = () => {
    return <ItemBigSVG color={themeProvide().primary} />;
  };

  const renderEmptyPage = () => {
    return (
      <EmptyPageView
        icon={renderSvgIcon}
        title={I18n.t('noItemTitle', {tabName: I18n.t('salesman_menu')})}
        message={I18n.t('noItemAddText', {tabName: I18n.t('salesman_menu')})}
        buttonTitle={`+ ${I18n.t('salesman_menu')}`}
        onAddClick={() => {
          props.navigation.navigate('AddSalesmanScreen', {
            onAddSalesmanPress: onAddSalesmanPress,
          });
        }}
      />
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
          paddingBottom: 72,
          justifyContent: 'center',
        }}
        data={listData}
        extraData={listData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={flatListItemSeparator}
        showsVerticalScrollIndicator={false}
        initialNumToRender={listData.length}
        ListFooterComponent={renderFlatListFooter()}
        // ListHeaderComponent={renderFlatListHeader()}
        onEndReachedThreshold={0.8}
        // onEndReached={memoizedhandleLoadMore}
        onScrollBeginDrag={Keyboard.dismiss}
        renderItem={({item, index}) => (
          <SalesmanRow
            item={item}
            onItemClick={() => {}}
            onMoreIconClick={() => {
              twoOptionsAlertFunction(I18n.t('deleteUserAsk'), () => {
                doDeleteSalesmanApi(item.id, index);
              });
            }}
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

  const renderFlatListFooter = () => {
    return (
      loadingFooter && (
        <View
          style={{
            flex: 1,
            height: 84,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size={32} color={themeProvide().primary} />
        </View>
      )
    );
  };
  const memoizedhandleLoadMore = () => {
    if (!loadingFooter && totalRecords.current > listData.length) {
      pageNo.current += 1;
      // this.setState({ loadingFooter: true });
      setLoadingFooter(!loadingFooter);
      // callApi(true);
      getSalesmanApi();
    } else if (totalRecords.current === listData.length && loadingFooter) {
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
  const onAddSalesmanPress = () => {
    getSalesmanApi();
  };
  const getSalesmanApi = () => {
    if (pageNo.current === 1) {
      setLoading(true);
    }
    props.doGetSalesMan({
      paramData: {page: pageNo.current},
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        setLoadingFooter(false);
        if (isSuccess) {
          console.log('data', data);
          totalRecords.current = data?.total;
          try {
            if (data != null) {
              if (!isArrayNullOrEmpty(data?.data)) {
                if (pageNo.current === 1) {
                  setListData(data?.data);
                } else {
                  const updateArr = [...listData, ...data?.data];
                  setListData(updateArr);
                }
              }
            }
          } catch (error) {
            console.log('error', error);
            setListData([]);
          }
        }
      },
    });
  };
  const doDeleteSalesmanApi = (id, index) => {
    setLoading(true);
    props.doDeleteSalesMan({
      paramData: {user_id: id},
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        if (isSuccess) {
          listData.splice(index, 1);
        } else {
          showMessageAlert(data.message);
        }
      },
    });
  };
  const renderAddButtom = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddSalesmanScreen', {
            onAddSalesmanPress: onAddSalesmanPress,
          });
        }}
        style={styles.AddView}>
        <AddItemSVG />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().page_back}
          title={I18n.t('salesman_menu')}
          onPress={() => {
            props.navigation.goBack();
          }}
          logoToolbarType={false}
        />
        {/* {renderTopTab()} */}
        {listData.length === 0 ? renderEmptyPage() : renderFlatList()}
      </View>
      {listData.length > 0 && renderAddButtom()}
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
  doGetSalesMan: doGetSalesMan,
  doDeleteSalesMan: doDeleteSalesMan,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesmanScreen);

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().page_back},
  safeView: {flex: 1, backgroundColor: themeProvide().page_back},
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
    marginTop: 16,
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
  AddView: {
    backgroundColor: themeProvide().primary,
    borderRadius: 40,
    position: 'absolute',
    bottom: 32,
    right: 32,
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
