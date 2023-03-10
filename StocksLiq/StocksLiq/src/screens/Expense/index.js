import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import EmptyPageView from '../../common/EmptyPageView';
import ItemBigSVG from '../../assets/svgs/ItemBigSVG';

import {
  getCurrenyPrice,
  getLanguage,
  isArrayNullOrEmpty,
  kFormatter,
  themeProvide,
} from '../../util/globalMethods';
import SearchSvgIcon from '../../assets/svgs/SearchSvgIcon';

import {store} from '../../store/configureStore';
import TabHeader from '../../common/TabHeader';
import {FlatList} from 'react-native-gesture-handler';
import ExpenseRow from './ExpenseRow';
import FilterSvgIcon from '../../assets/svgs/FilterSvgIcon';
import AddItemSVG from '../../assets/svgs/AddItemSVG';
import {TextInput} from 'react-native';
import {connect} from 'react-redux';

import RenderModal from '../../common/RenderModal';
import CheckBoxPlain from '../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../assets/svgs/CheckBoxWithTick';
import ThemeButton from '../../common/ThemeButton';
import Loader from '../../common/loader/Loader';
import {doGetExpenses} from './Action';
import moment from 'moment';
import DateRangePicker from 'rn-select-date-range';

const ExpenseScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [salectedTabId, setSelectedTabId] = useState(
    store.getState()?.ExpenseReducer?.expenseTypeArray[0]?.value,
  );
  const [categoriesTabs, setCategoriesTabs] = useState(
    store.getState()?.ExpenseReducer?.expenseTypeArray,
  );

  const [listData, setListData] = useState([]);
  const [loadingFooter, setLoadingFooter] = useState(false);
  const [filterSheetVisible, setFilterSheetVisile] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [totalExpense, setTotalExpense] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const refRBSheet = useRef();
  let pageSize = 10;
  let searchString = useRef('');
  let pageNo = useRef(1);
  let totalPage = useRef(2000);
  let dateRangeRef = useRef(null);
  let totalRecords = useRef(0);

  const renderSvgIcon = () => {
    return <ItemBigSVG color={themeProvide().primary} />;
  };
  useEffect(() => {
    getExpenseApi(salectedTabId);
  }, [salectedTabId]);

  const getExpenseApi = (salectedTabId, search_text = '') => {
    if (pageNo.current === 1) {
      setLoading(true);
    }
    props.doGetExpenses({
      paramData: {
        expense_type: salectedTabId.toLowerCase(),
        search_text: search_text,
        from_date: startDate,
        to_date: endDate,
        page: pageNo.current,
      },
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        setLoadingFooter(false);
        if (isSuccess) {
          console.log('data', data);

          try {
            if (data != null) {
              totalRecords.current = data?.total;
              setTotalExpense(data?.total_expenses);
              if (pageNo.current === 1) {
                setListData(data?.expenses_list?.data);
              } else {
                const updateArr = [...listData, ...data?.expenses_list?.data];
                setListData(updateArr);
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
  const renderTopTab = () => {
    console.log('categoriesTabs',categoriesTabs)
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
                setSelectedTabId(el.value);
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
          justifyContent: 'center',

          marginHorizontal: 20,
          paddingBottom: 20,
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
          <ExpenseRow
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
      getExpenseApi(salectedTabId, searchString.current);
    } else {
      searchString.current = '';
      if (value.trim().length === 0) {
        pageNo.current = 1;
        // callApi(false);
        getExpenseApi(salectedTabId, searchString.current);
      }
    }
  };
  const renderSearchViewHeader = () => {
    return (
      <>
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
      </>
    );
  };
  const renderFlatListHeader = isData => {
    return (
      <>
        <View style={styles.totalExpenseView}>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '900',
              color: themeProvide().white,
              marginTop: 4,
              fontSize: 32,
            }}>
            {getCurrenyPrice(Number(totalExpense))}
          </Text>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '300',
              fontSize: 14,
              marginTop: 4,
              color: themeProvide().white,
            }}>
            Total Expense
          </Text>
        </View>
      </>
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
      getExpenseApi(salectedTabId);
    } else if (totalRecords.current === pageNo.current && loadingFooter) {
      setLoadingFooter(!loadingFooter);
    }
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
              fontSize: 32,
              textAlign: 'center',
              color: themeProvide().black,
            }}>
            {I18n.t('filterTitle')}
          </Text>
          <View style={styles.filterInnerStyle} />
          <DateRangePicker
            ref={dateRangeRef}
            onSelectDateRange={range => {
              console.log('range', range);
              // setRange(range);
              setStartDate(range.firstDate);
              setEndDate(range.secondDate);
            }}
            blockSingleDateSelection={true}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
            minDate={moment().subtract(100, 'days')}
            clearBtnTitle={''}
            confirmBtnTitle={''}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
          />

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
            // dateRangeRef?.current?.onClear();
            setFilterSheetVisile(false);
          }}
          buttonTitle={I18n.t('cancel')}
        />
        <ThemeButton
          buttonstyle={[styles.buttonstyleApply]}
          onPress={() => {
            setFilterSheetVisile(false);
            resetItems();
            // dateRangeRef?.current?.onConfirm();
            getExpenseApi(salectedTabId);
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
          props.navigation.navigate('AddExpenseScreen', {
            getOnAddExpense: getOnAddExpense,
            salectedTabId: salectedTabId.toLowerCase(),
          });
        }}
        style={styles.AddView}>
        <AddItemSVG />
      </TouchableOpacity>
    );
  };
  const renderEmptyPage = () => {
    return (
      <EmptyPageView
        icon={renderSvgIcon}
        onAddClick={() => {
          props.navigation.navigate('AddExpenseScreen', {
            getOnAddExpense: getOnAddExpense,
            salectedTabId: salectedTabId.toLowerCase(),
          });
        }}
        title={I18n.t('noItemTitle', {tabName: I18n.t('expenseTabName')})}
        message={I18n.t('noItemAddText', {
          tabName: I18n.t('expenseTabName'),
        })}
        buttonTitle={`+ ${I18n.t('expenseTabName')}`}
      />
    );
  };
  const resetItems = () => {
    setListData([]);
    pageNo.current = 1;
    // setSearchText={}
    // setListData([]);
  };

  const getOnAddExpense = () => {
    resetItems();
    getExpenseApi(salectedTabId);
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
        {renderTopTab()}
        {renderSearchViewHeader()}

        {listData.length === 0 ? renderEmptyPage() : renderFlatList()}
      </View>
      {listData.length > 0 && renderAddButtom()}
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
    ExpenseReducer: state.ExpenseReducer,
  };
};

const mapDispatchToProps = {
  doGetExpenses: doGetExpenses,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseScreen);

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
    marginHorizontal: 20,
    paddingVertical: 16,
  },
  filterView: {
    backgroundColor: themeProvide().primary,
    borderRadius: 8,
    marginLeft: 12,
    padding: 12,
  },
  totalExpenseView: {
    backgroundColor: themeProvide().primary,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    padding: 16,
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
  filterViewStyle: {
    paddingHorizontal: 24,
    backgroundColor: themeProvide().white,
    paddingVertical: 16,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeProvide().primary,
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
