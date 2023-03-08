import {View, SafeAreaView, StyleSheet, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {isObjectNullOrUndefined, themeProvide} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from 'i18n-js';
import DownloadSVG from '../../assets/svgs/DownloadSVG';
import {fonts} from '../../../assets/fonts/fonts';
import {doGetDownloadPdf} from './Action';
import {connect} from 'react-redux';

const ReportDetailScreen = props => {
  const [isLoading, setLoading] = useState(false);

  const [productName, setProductName] = useState('');
  const [catName, setCatName] = useState('');
  const [subCatName, setSubCatName] = useState('');
  const [listData, setListData] = useState([]);
  const [headerArr, setHeaderArray] = useState([]);
  const detail = props.route.params.data;
  useEffect(() => {
    const detail = props.route.params.data;
    console.log(detail);
    setCatName(detail.category_name);
    setSubCatName(detail?.stocks?.subcategory_name);
    setProductName(detail?.stocks?.name);
    let headerObj = [I18n.t('name')];
    let arr = [];
    detail?.types.forEach((element, index) => {
      headerObj.push(element.lang_name);

      if (detail?.stocks?.initial_values.length > 0) {
        for (
          let _index = 0;
          _index < detail?.stocks?.initial_values.length;
          _index++
        ) {
          const flowObj = detail?.stocks?.initial_values[_index];
          const findObj = arr.find(
            item => item.title === I18n.t('initialQuantity'),
          );
          if (flowObj.type_id === element.type_id) {
            if (!isObjectNullOrUndefined(findObj)) {
              findObj['value' + _index] = flowObj?.value;
            } else {
              let obj = {
                title: I18n.t('initialQuantity'),
                ['value' + _index]: flowObj?.value,
              };
              arr.push(obj);
            }
          }
        }
      }
      if (detail?.stocks?.inflow_values.length > 0) {
        for (
          let _index = 0;
          _index < detail?.stocks?.inflow_values.length;
          _index++
        ) {
          const flowObj = detail?.stocks?.inflow_values[_index];
          const findObj = arr.find(
            item => item.title === I18n.t('inflowQuantity'),
          );
          if (flowObj.type_id === element.type_id) {
            if (!isObjectNullOrUndefined(findObj)) {
              findObj['value' + _index] = flowObj?.value;
            } else {
              let obj = {
                title: I18n.t('inflowQuantity'),
                ['value' + _index]: flowObj?.value,
              };
              arr.push(obj);
            }
          }
        }
      }
      if (detail?.stocks?.outflow_values.length > 0) {
        for (
          let _index = 0;
          _index < detail?.stocks?.outflow_values.length;
          _index++
        ) {
          const flowObj = detail?.stocks?.outflow_values[_index];
          const findObj = arr.find(item => item.title === I18n.t('sendingQuantity'));
          if (flowObj.type_id === element.type_id) {
            if (!isObjectNullOrUndefined(findObj)) {
              findObj['value' + _index] = flowObj?.value;
            } else {
              let obj = {
                title: I18n.t('sendingQuantity'),
                ['value' + _index]: flowObj?.value,
              };
              arr.push(obj);
            }
          }
        }
      }
      if (detail?.stocks?.remaining_values.length > 0) {
        for (
          let _index = 0;
          _index < detail?.stocks?.remaining_values.length;
          _index++
        ) {
          const flowObj = detail?.stocks?.remaining_values[_index];
          const findObj = arr.find(item => item.title === I18n.t('remainderQuantity'));
          if (flowObj.type_id === element.type_id) {
            if (!isObjectNullOrUndefined(findObj)) {
              findObj['value' + _index] = flowObj?.value;
            } else {
              let obj = {
                title: I18n.t('remainderQuantity'),
                ['value' + _index]: flowObj?.value,
              };
              arr.push(obj);
            }
          }
        }
      }
      if (detail?.stocks?.sell_values.length > 0) {
        for (
          let _index = 0;
          _index < detail?.stocks?.sell_values.length;
          _index++
        ) {
          const flowObj = detail?.stocks?.sell_values[_index];
          const findObj = arr.find(item => item.title === I18n.t('saleQuantity'));
          if (flowObj.type_id === element.type_id) {
            if (!isObjectNullOrUndefined(findObj)) {
              findObj['value' + _index] = flowObj?.value;
            } else {
              let obj = {
                title: I18n.t('saleQuantity'),
                ['value' + _index]: flowObj?.value,
              };
              arr.push(obj);
            }
          }
        }
      }
      if (detail?.stocks?.rate_values.length > 0) {
        for (
          let _index = 0;
          _index < detail?.stocks?.rate_values.length;
          _index++
        ) {
          const flowObj = detail?.stocks?.rate_values[_index];
          const findObj = arr.find(item => item.title === I18n.t('rate'));
          if (flowObj.type_id === element.type_id) {
            if (!isObjectNullOrUndefined(findObj)) {
              findObj['value' + _index] = I18n.t('totalPrice', {
                price: flowObj?.value,
              });
            } else {
              let obj = {
                title: I18n.t('rate'),
                ['value' + _index]: I18n.t('totalPrice', {
                  price: flowObj?.value,
                }),
              };
              arr.push(obj);
            }
          }
        }
      }
      if (detail?.stocks?.total_values.length > 0) {
        for (
          let _index = 0;
          _index < detail?.stocks?.total_values.length;
          _index++
        ) {
          const flowObj = detail?.stocks?.total_values[_index];
          const findObj = arr.find(item => item.title === I18n.t('amount'));
          if (flowObj.type_id === element.type_id) {
            if (!isObjectNullOrUndefined(findObj)) {
              findObj['value' + _index] = I18n.t('totalPrice', {
                price: flowObj?.value,
              });
            } else {
              let obj = {
                title: I18n.t('amount'),
                ['value' + _index]: I18n.t('totalPrice', {
                  price: flowObj?.value,
                }),
              };
              arr.push(obj);
            }
          }
        }
      }

      console.log(arr);
    });
    setHeaderArray(headerObj);
    setListData(arr);
  }, []);

  const flatListItemSeparator = () => {
    return <View style={styles.deviderTopStyle} />;
  };
  const renderFlatListHeader = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', flex: 1}}>
          {headerArr.map(item => {
            return <Text style={styles.headerText}>{item}</Text>;
          })}
        </View>
        <View style={styles.deviderStyle} />
      </View>
    );
  };
  const renderFlatListFooter = () => {
    return (
      <View>
        <View style={styles.deviderStyle} />
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={styles.headerText}>{I18n.t('totalAmount')}</Text>
          <Text style={styles.headerText}>
            {I18n.t('totalPrice', {
              price: detail?.stocks?.total,
            })}
          </Text>
          <Text style={styles.headerText}>{''}</Text>
        </View>
        <View style={styles.deviderStyle} />
      </View>
    );
  };

  const doGetDownloadPdfApi = () => {
    setLoading(true);
    props.doGetDownloadPdf({
      paramData: {},
      onSuccess: (isSuccess, status, data) => {
        setLoading(false);
      },
    });
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          title={''}
          onPress={() => {
            props.navigation.goBack();
          }}
          backgroundColor={themeProvide().page_back}
          isRightIcon={false}
          onRightIconClick={() => {
            // props.navigation.openDrawer();
            doGetDownloadPdfApi();
          }}
          // RightIcon={<DownloadSVG />}
          logoToolbarType={false}
        />
        <Text style={styles.productNameStyle}>{productName}</Text>
        <Text
          style={styles.productCatStyle}>{`${catName} > ${subCatName}`}</Text>
        <View style={styles.deviderTopStyle} />
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingBottom: 20,
            justifyContent: 'center',
          }}
          data={listData}
          extraData={listData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => {
            return <View style={styles.deviderStyle}></View>;
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={listData.length}
          ListHeaderComponent={renderFlatListHeader()}
          ListFooterComponent={renderFlatListFooter()}
          renderItem={({item, index}) => (
            <View
              style={{flexDirection: 'row', marginTop: index === 0 ? 12 : 0}}>
              <Text style={styles.headerText}>{item.title}</Text>
              {detail?.types.map((element, _index) => {
                return (
                  <Text style={styles.valueText}>{item['value' + _index]}</Text>
                );
              })}
            </View>
          )}
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
  doGetDownloadPdf: doGetDownloadPdf,
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailScreen);

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().page_back},
  safeView: {flex: 1, backgroundColor: themeProvide().page_back},
  productNameStyle: {
    color: themeProvide().headerBlack,
    fontFamily: fonts.InterRegular,
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 16,
  },
  productCatStyle: {
    color: themeProvide().black50,
    fontFamily: fonts.InterRegular,
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 16,
  },
  deviderTopStyle: {
    height: 1,
    marginVertical: 12,
    backgroundColor: themeProvide().primary,
    marginHorizontal: 16,
  },
  deviderStyle: {
    height: 1,
    marginVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  headerText: {
    fontWeight: '700',
    fontFamily: fonts.InterRegular,
    fontSize: 12,
    flex: 1,
    height: 18,
    color: themeProvide().black,
  },
  valueText: {
    fontWeight: '300',
    fontFamily: fonts.InterRegular,
    fontSize: 12,
    flex: 1,
    height: 18,
    color: themeProvide().black,
  },
});
