import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {
  themeProvide,
  getCurrenyPrice,
  isStringNotNull,
  showMessageAlert,
} from '../../../util/globalMethods';
import DeleteIconSvg from '../../../assets/svgs/DeleteIconSvg';
import {fonts} from '../../../../assets/fonts/fonts';
import ThemeButton from '../../../common/ThemeButton';
import I18n from 'i18n-js';
import {TextInput, Checkbox} from 'react-native-paper';
import ArrowUp from '../../../assets/svgs/ArrowUp';
import ArrowDown from '../../../assets/svgs/ArrowDown';

const SalesRow = props => {
  console.log('props', props?.item);
  const [listItem, setListItem] = useState({...props?.item});
  const [isEdit, setEdit] = useState(false);
  const [itemTypeArr, setItemTypeArr] = useState(listItem?.sales);

  const _onChangeText = (key, value) => {
    setListItem(prevState => ({
      ...prevState,
      sales: prevState.sales.map(obj =>
        obj.type_id === key ? {...obj, quantity_Up: value} : obj,
      ),
    }));

    // setItemTypeArr(current =>
    //   current.map(obj => {
    //     if (obj.type_id === key) {
    //       return {...obj, quantity_Up: value};
    //     }
    //     return obj;
    //   }),
    // );
    // setListItem(current => )
    // const obj = {...listItem};
    // obj.sales = itemTypeArr;
    // setListItem(obj);
    // return {
    //   ...listItem,
    //   sales: itemTypeArr,
    // };
  };
  const renderInputView = (id, label, value, key) => {
    return (
      <View style={styles.renderInputView}>
        <TextInput
          key={id}
          label={I18n.t('bottleQuantity', {type: label})}
          placeholder={I18n.t('enterQuantity', {type: label})}
          value={value}
          dense={false}
          mode={'outlined'}
          style={styles.inputStyle}
          error={false}
          theme={{
            colors: {
              primary: themeProvide().black,
              error: themeProvide().primary,
            },
          }}
          keyboardType={'number-pad'}
          placeholderColor={themeProvide().borderBlack}
          activeUnderlineColor={themeProvide().black}
          underlineColorAndroid={renderDevider()}
          onChangeText={value1 => _onChangeText(key, value1)}
        />
      </View>
    );
  };
  const renderDevider = () => {
    return <View style={styles.renderDevider} />;
  };
  const renderDeviderList = () => {
    return <View style={styles.renderDeviderList} />;
  };
  const priceView = (item, index) => {
    console.log('item', item);
    return (
      <View
        style={{
          width: '33%',
          flex: 1,
          marginVertical: 8,
          marginLeft: index !== 0 ? 8 : 0,
        }}>
        <Text
          style={{
            fontFamily: fonts.InterRegular,
            fontWeight: '400',
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          {item?.types?.language?.lang_name}
        </Text>
        <Text
          style={{
            fontFamily: fonts.InterRegular,
            fontWeight: '700',
            color: themeProvide().black,
            marginTop: 4,
            fontSize: 12,
          }}>
          {item?.total_qty}
        </Text>
        {isEdit &&
          renderInputView(
            item?.types?.language?.type_id,
            item?.types?.language?.lang_name,
            isStringNotNull(item?.quantity_Up) ? item?.quantity_Up : '',
            item?.type_id,
          )}
      </View>
    );
  };
  const onSavePress = () => {
    let checkArray = listItem.sales;
    console.log(listItem.sales);
    let msg = '';
    if (checkArray.length > 0) {
      checkArray.some(function (item) {
        if (isStringNotNull(item?.quantity_Up) && item?.quantity_Up <= 0) {
          msg = I18n.t('enterZeroQuantityError', {
            type: item?.types?.language?.lang_name,
          });
          return item?.quantity_Up === '';
        }
      });
    } else {
      msg = I18n.t('itemTypeError');
    }
    if (isStringNotNull(msg)) {
      showMessageAlert(msg);
    } else {
      setEdit(false);
      let getTypeData = checkArray.reduce((acc, d) => {
        if (isStringNotNull(d.quantity_Up)) {
          let obj = {
            id: d?.types?.type_id,
            qty: d.quantity_Up,
          };
          acc.push(obj);
          return acc;
        }
      }, []);
      // console.log('getTypeData', getTypeData);
      props.onUpdateItemClick(listItem.id, getTypeData);
    }
  };
  const renderButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyle]}
          textStyle={styles.buttonTextstyle}
          onPress={() => {
            onSavePress();
          }}
          buttonTitle={I18n.t('add_sales')}
        />
      </View>
    );
  };
  return (
    <TouchableOpacity onPress={props.onItemClick} style={styles.mainView}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '700',
              fontSize: 14,
            }}>
            {listItem?.name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '400',
              fontSize: 12,
              marginTop: 4,
              color: 'rgba(0, 0, 0, 0.5)',
            }}>
            {listItem?.category?.lang_name}
          </Text>
        </View>
        {listItem?.sales?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setEdit(!isEdit);
            }}>
            {isEdit ? <ArrowUp /> : <ArrowDown />}
          </TouchableOpacity>
        )}
      </View>
      {listItem?.sales?.length > 0 && (
        <FlatList
          data={listItem?.sales}
          // horizontal
          numColumns={3}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  marginTop: 12,
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }}
              />
            );
          }}
          contentContainerStyle={{flexGrow: 1}}
          // data={[1, 2, 3, 4, 5, 6, 7, 8]}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => renderDeviderList()}
          // initialNumToRender={listData.length}
          renderItem={({item, index}) => {
            return priceView(item, index);
          }}
        />
      )}
      {isEdit && listItem?.sales?.length > 0 && renderButtonView()}
    </TouchableOpacity>
  );
};

export default SalesRow;
const styles = StyleSheet.create({
  mainView: {
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    backgroundColor: themeProvide().white,
  },
  renderInputView: {marginVertical: 12},
  inputLabel: {fontSize: 12},
  inputValue: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
    fontFamily: fonts.InterRegular,
  },
  renderDevider: {
    backgroundColor: themeProvide().black,
    opacity: 0.06,
    height: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  renderDeviderList: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    width: 100,
  },
  buttonView: {
    flexDirection: 'row',
  },
  buttonstyle: {
    backgroundColor: themeProvide().primary,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginTop: 8,
    borderColor: themeProvide().primary,
    borderWidth: 1,
  },
});
