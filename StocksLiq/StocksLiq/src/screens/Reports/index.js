import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Alert,
  Linking,
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
import ReportRow from './ReportRow';
import FilterSvgIcon from '../../assets/svgs/FilterSvgIcon';
import AddItemSVG from '../../assets/svgs/AddItemSVG';
import {TextInput} from 'react-native';
import {connect} from 'react-redux';

import RenderModal from '../../common/RenderModal';
import CheckBoxPlain from '../../assets/svgs/CheckBoxPlain';
import CheckBoxWithTick from '../../assets/svgs/CheckBoxWithTick';
import ThemeButton from '../../common/ThemeButton';
import Loader from '../../common/loader/Loader';
import {
  doGetUserReport,
  doGetDownloadPdf,
  doGetUserReportDetails,
} from './Action';
import DownloadSVG from '../../assets/svgs/DownloadSVG';
import DateRangePicker from 'rn-select-date-range';
import moment from 'moment';

const ReportsScreen = props => {
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
  let dateRangeRef = useRef(null);
  const [startDate, setStartDate] = useState(
    moment(new Date()).subtract(30, 'days').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  useEffect(() => {
    if (!isArrayNullOrEmpty(store?.getState()?.ItemReducer?.categoryData)) {
      setCategoriesTabs([...store?.getState()?.ItemReducer?.categoryData]);
      setSelectedTabId(store?.getState()?.ItemReducer?.categoryData[0].value);
      // getReportApi();
    }
    console.log(startDate, endDate);
  }, []);
  useEffect(() => {
    getReportApi();
  }, [salectedTabId]);
  const renderSvgIcon = () => {
    return <ItemBigSVG color={themeProvide().primary} />;
  };
  const getReportApi = () => {
    console.log(pageNo.current);
    setLoading(true);

    props.doGetUserReport({
      paramData: {
        cat_id: salectedTabId,
        from_date: startDate,
        to_date: endDate,
      },
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        setLoadingFooter(false);
        setListData(
          isSuccess && !isArrayNullOrEmpty(data?.data) ? data?.data : [],
        );
      },
    });
  };

  const getReportDetailApi = item => {
    console.log(pageNo.current);
    setLoading(true);

    props.doGetUserReportDetails({
      paramData: {
        category_id: salectedTabId,
        item_id: item.item_id,
        from_date: '01-02-2023',
      },
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        setLoadingFooter(false);
        if (isSuccess) {
          console.log('data', data);
          // totalRecords.current = data?.data?.total ?? 0;
          if (!isArrayNullOrEmpty(data?.data)) {
            props.navigation.navigate('ReportDetailScreen', {data: data?.data});

            // if (pageNo.current === 1) {
            //   setListData(data?.data);
            // } else {
            //   const updateArr = [...listData, ...data?.data];
            //   setListData(updateArr);
            // }
          }
        }
      },
    });
  };
  const resetDateFilter = () => {
    setStartDate(moment(new Date()).subtract(30, 'days').format('YYYY-MM-DD'));
    setEndDate(moment(new Date()).format('YYYY-MM-DD'));
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
                resetDateFilter();
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
          <ReportRow
            item={item}
            onItemClick={() => {
              getReportDetailApi(item);
            }}
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
              fontSize: 32,
              textAlign: 'center',
              color: themeProvide().black,
            }}>
            {'Filter'}
          </Text>
          <View style={styles.filterInnerStyle} />
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
            setFilterSheetVisile(false);
          }}
          buttonTitle={I18n.t('cancel')}
        />
        <ThemeButton
          buttonstyle={[styles.buttonstyleApply]}
          onPress={() => {
            setFilterSheetVisile(false);
            getReportApi();
          }}
          buttonTitle={I18n.t('apply')}
        />
      </View>
    );
  };
  const renderEmptyPage = () => {
    return (
      <EmptyPageView
        icon={renderSvgIcon}
        hideAddButton={true}
        title={I18n.t('noItemTitle', {tabName: I18n.t('reportTabName')})}
        message={I18n.t('noReportText', {tabName: I18n.t('reportTabName')})}
        buttonTitle={`+ ${I18n.t('reportTabName')}`}
      />
    );
  };
  const doGetDownloadPdfApi = () => {
    setLoading(true);
    props.doGetDownloadPdf({
      paramData: {
        from_date: startDate,
        to_date: endDate,
      },
      onSuccess: (isSuccess, status, data) => {
        // console.log('data', data);
        setLoading(false);
        if (isSuccess) {
          Alert.alert(
            I18n.t('downloadSuccess'),
            I18n.t('downloadReportMessage', {link: data?.data}),
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Open', onPress: () => Linking.openURL(data?.data)},
            ],
          );
        }
      },
    });
  };
  const renderAddButtom = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          doGetDownloadPdfApi();
        }}
        style={styles.AddView}>
        <DownloadSVG color={themeProvide().white} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          title={I18n.t('reportTabName')}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          logoToolbarType={true}
        />
        {renderTopTab()}
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
    ItemReducer: state.ItemReducer,
  };
};

const mapDispatchToProps = {
  doGetUserReport: doGetUserReport,
  doGetUserReportDetails: doGetUserReportDetails,
  doGetDownloadPdf: doGetDownloadPdf,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsScreen);

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
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
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
});
