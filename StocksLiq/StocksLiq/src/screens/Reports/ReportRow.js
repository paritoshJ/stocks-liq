import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import DownloadSVG from '../../assets/svgs/DownloadSVG';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from '../../localization';

const ReportRow = props => {
  const priceView = type => {
    return (
      <View style={{flex: 1}}>
        <View>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '400',
              fontSize: 14,
              color: 'rgba(0, 0, 0, 0.5)',
            }}>
            {type?.lang_name}
          </Text>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '700',
              color: themeProvide().black,
              marginTop: 4,
              fontSize: 12,
            }}>
            {type?.total_sale}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '400',
              fontSize: 14,
              color: 'rgba(0, 0, 0, 0.5)',
            }}>
            {I18n.t('typeAmount', {type: type?.lang_name})}
          </Text>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '700',
              color: themeProvide().black,
              marginTop: 4,
              fontSize: 12,
            }}>
            {getCurrenyPrice(Number(type?.type_price))}
          </Text>
        </View>
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
            {props?.item?.item_name}
          </Text>
          {props?.item?.subcategory_name && (
            <Text
              numberOfLines={2}
              style={{
                fontFamily: fonts.InterRegular,
                fontWeight: '400',
                fontSize: 12,
                marginTop: 4,
                color: 'rgba(0, 0, 0, 0.5)',
              }}>
              {props?.item?.subcategory_name}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={props.onMoreIconClick}>
          <DownloadSVG />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          marginVertical: 12,
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }}
      />
      {props?.item?.types_data?.length > 0 && (
        <FlatList
          data={props?.item?.types_data}
          // horizontal
          numColumns={3}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  marginTop: 8,
                }}
              />
            );
          }}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return priceView(item);
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ReportRow;
const styles = StyleSheet.create({
  mainView: {
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    backgroundColor: themeProvide().white,
  },
});
