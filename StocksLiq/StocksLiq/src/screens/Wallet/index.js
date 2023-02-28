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
  getCurrenyPrice,
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
import {connect} from 'react-redux';

import {store} from '../../store/configureStore';
import TabHeader from '../../common/TabHeader';
import {FlatList} from 'react-native-gesture-handler';
import WalletRow from './WalletRow';
import FilterSvgIcon from '../../assets/svgs/FilterSvgIcon';
import AddItemSVG from '../../assets/svgs/AddItemSVG';
import {TextInput} from 'react-native';

import RenderModal from '../../common/RenderModal';
import CheckBoxPlain from '../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../assets/svgs/CheckBoxWithTick';
import ThemeButton from '../../common/ThemeButton';
import Loader from '../../common/loader/Loader';
import {doGetWallet} from './Action';

const WalletScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [salectedTabId, setSelectedTabId] = useState(null);
  const [categoriesTabs, setCategoriesTabs] = useState([]);
  const [listData, setListData] = useState([]);
  const [loadingFooter, setLoadingFooter] = useState(false);
  const [filterSheetVisible, setFilterSheetVisile] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  // const refRBSheet = useRef();
  let pageSize = 10;
  let searchString = useRef('');
  let pageNo = useRef(1);
  let totalPage = useRef(2000);
  let totalRecords = useRef(0);

  useEffect(() => {
    if (!isArrayNullOrEmpty(store?.getState()?.ItemReducer?.categoryData)) {
      setCategoriesTabs([...store?.getState()?.ItemReducer?.categoryData]);
      setSelectedTabId(store?.getState()?.ItemReducer?.categoryData[0].cat_id);
    }
    getWalletApi();
  }, []);
  const getWalletApi = () => {
    console.log(pageNo.current);
    setLoading(pageNo.current === 1);

    props.doGetWallet({
      paramData: {
        page: pageNo.current,
      },
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        setLoadingFooter(false);
        if (isSuccess) {
          console.log('data', data);
          totalRecords.current = data?.data?.total ?? 0;
          setTotalAmount(data?.wallet_amount ?? 0);
          if (!isArrayNullOrEmpty(data?.data?.data)) {
            if (pageNo.current === 1) {
              setListData(data?.data?.data);
            } else {
              const updateArr = [...listData, ...data?.data?.data];
              setListData(updateArr);
            }
          }
        }
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
        title={I18n.t('noItemTitle', {tabName: I18n.t('wallet_menu')})}
        message={I18n.t('noWalletAddText')}
        buttonTitle={`+ ${I18n.t('wallet_menu')}`}
        hideAddButton={true}
        hideSvg={true}
        onAddClick={() => {
          // props.navigation.navigate('AddSalesmanScreen');
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
        onEndReached={memoizedhandleLoadMore}
        onScrollBeginDrag={Keyboard.dismiss}
        renderItem={({item, index}) => (
          <WalletRow
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
  const renderAddButtom = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddSalesmanScreen');
        }}
        style={styles.AddView}>
        <AddItemSVG />
      </TouchableOpacity>
    );
  };
  const getOnAddRedeemRequest = () => {
    setListData([]);
    pageNo.current = 1;
    getWalletApi();
  };
  const renderFilterButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyleCancel]}
          onPress={() => {
            props.navigation.navigate('ReferFriendScreen');
          }}
          buttonTitle={I18n.t('refer_a_friend_menu')}
        />
        <ThemeButton
          buttonstyle={[styles.buttonstyleApply]}
          onPress={() => {
            props.navigation.navigate('RedeemRequestScreen', {
              getOnAddRedeemRequest: getOnAddRedeemRequest,
            });
          }}
          buttonTitle={I18n.t('redeem_request')}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().page_back}
          title={I18n.t('wallet_menu')}
          onPress={() => {
            props.navigation.goBack();
          }}
          logoToolbarType={false}
        />
        {/* {renderTopTab()} */}
        <View style={styles.totalExpenseView}>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '900',
              color: themeProvide().white,
              marginTop: 4,
              fontSize: 32,
            }}>
            {getCurrenyPrice(Number(totalAmount))}
          </Text>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '300',
              fontSize: 14,
              marginTop: 4,
              color: themeProvide().white,
            }}>
            Total earnings
          </Text>
        </View>
        {listData.length === 0 ? renderEmptyPage() : renderFlatList()}
      </View>
      {renderFilterButtonView()}
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
  doGetWallet: doGetWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

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
    bottom: 72,
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
    marginHorizontal: 16,
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
  totalExpenseView: {
    backgroundColor: themeProvide().primary,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 16,
    padding: 16,
  },
  filterViewStyle: {paddingHorizontal: 24, paddingVertical: 16},
});
