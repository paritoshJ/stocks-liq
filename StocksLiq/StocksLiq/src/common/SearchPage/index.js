import I18n from 'i18n-js';
import React, {useEffect, useRef, useMemo, useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {isArrayNullOrEmpty, themeProvide} from '../../util/globalMethods';
import ToolbarHeader from '../ToolbarHeader';
import {connect} from 'react-redux';
import SearchProductRow from './SearchProductRow';
import {Keyboard} from 'react-native';
import {TextInput} from 'react-native';
import SearchSvgIcon from '../../assets/svgs/SearchSvgIcon';
import {fonts} from '../../../assets/fonts/fonts';
import {doGetInventoryProducts} from '../../screens/Inventory/Action';

const SearchScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [loadingFooter, setLoadingFooter] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  //   cate_id: category,
  //             subcat_id: subCategory,
  let pageSize = 10;
  let searchString = useRef('');
  let pageNo = useRef(1);
  let totalPage = useRef(2000);
  let totalRecords = useRef(0);

  useEffect(() => {
    // getItemsApi();
  });
  const getItemsApi = (search_text = '') => {
    if (pageNo.current === 1) {
      setLoading(true);
    }

    props.doGetInventoryProducts({
      paramData: {
        // cat_id: [props.route.params.subcat_id],
        search_text: search_text,
        page: pageNo.current,
      },
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
        setLoadingFooter(false);
        if (isSuccess) {
          console.log('data', data);
          totalRecords.current = data?.total;
          // setTotalRecords(isStringNotNull(data?.total) ?? 0);
          if (!isArrayNullOrEmpty(data)) {
            if (pageNo.current === 1) {
              setMasterDataSource(data);
            } else {
              const updateArr = [...listData, ...data];
              setMasterDataSource(updateArr);
            }
          }
        }
      },
    });
  };
  const _onChangeTexts = value => {
    setSearch(value);
    if (value.trim().length > 2) {
      searchString.current = value.trim();
      pageNo.current = 1;
      getItemsApi(searchString.current);
    } else {
      searchString.current = '';
      if (value.trim().length === 0) {
        pageNo.current = 1;
        // callApi(false);
        // getItemsApi(searchString.current);
      }
    }
  };
  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <SearchProductRow
        isIconNotShow={true}
        item={item}
        onItemClick={() => {
          props.route.params.onProductSelect(item);
          props.navigation.goBack();
        }}
        onMoreIconClick={() => {}}
      />
    );
  };
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
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
    if (!loadingFooter && totalRecords.current > masterDataSource.length) {
      pageNo.current += 1;
      // this.setState({ loadingFooter: true });
      setLoadingFooter(!loadingFooter);
      // callApi(true);
      getItemsApi('');
    } else if (
      totalRecords.current === masterDataSource.length &&
      loadingFooter
    ) {
      setLoadingFooter(!loadingFooter);
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
              value={search}
              style={styles.inputStyle}
              placeholderColor={themeProvide().borderBlack}
              onChangeText={value1 => {
                _onChangeTexts(value1);
                // setSearchText(value1);
              }}
            />
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().white}
          title={I18n.t('searchTitle')}
          onPress={() => {
            props.navigation.goBack();
          }}
          logoToolbarType={false}
        />
        {renderSearchViewHeader()}
        {/* <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={text => _onChangeTexts(text)}
          onClear={text => _onChangeTexts('')}
          placeholder="Type Here..."
          value={search}
        /> */}
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingBottom: 16,
            justifyContent: 'center',
          }}
          data={masterDataSource}
          showsVerticalScrollIndicator={false}
          initialNumToRender={listData.length}
          ListFooterComponent={renderFlatListFooter()}
          onEndReachedThreshold={0.8}
          onEndReached={memoizedhandleLoadMore}
          onScrollBeginDrag={Keyboard.dismiss}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
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
  doGetInventoryProducts: doGetInventoryProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeProvide().page_back,
    flex: 1,
  },
  itemStyle: {
    padding: 10,
  },
  searchMainView: {
    marginTop: 16,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 16,
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
  inputStyle: {
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 8,
    flex: 1,
    color: themeProvide().black,
    fontFamily: fonts.InterRegular,
  },
});
