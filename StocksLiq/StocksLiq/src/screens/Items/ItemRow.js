import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MoreMenuSvg from '../../assets/svgs/MoreMenuSVG';
import DeleteIconSvg from '../../assets/svgs/DeleteIconSvg';
import {fonts} from '../../../assets/fonts/fonts';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const ItemRow = props => {
  const priceView = item => {
    return (
      <View style={{width: '33%', flex:1, marginTop: 10}}>
        <Text
          style={{
            fontFamily: fonts.InterRegular,
            fontWeight: '400',
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          {item?.language?.lang_name}
        </Text>
        <Text
          style={{
            fontFamily: fonts.InterRegular,
            fontWeight: '700',
            color: themeProvide().black,
            marginTop: 4,
            fontSize: 12,
          }}>
          {getCurrenyPrice(Number(item?.type_price))}
        </Text>
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
            {props?.item?.name}
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
            {props?.item?.category?.lang_name}
          </Text>
        </View>
        {/* {!props?.isIconNotShow && (
          <TouchableOpacity onPress={props.onMoreIconClick}>
            <DeleteIconSvg />
          </TouchableOpacity>
        )} */}
      </View>
      {props?.item?.type?.length > 0 && (
        <FlatList
          data={props?.item?.type}
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
          // initialNumToRender={listData.length}
          renderItem={({item, index}) => {
            return priceView(item);
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ItemRow;
const styles = StyleSheet.create({
  mainView: {
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    backgroundColor: themeProvide().white,
  },
});
