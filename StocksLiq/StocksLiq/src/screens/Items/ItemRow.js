import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MoreMenuSvg from '../../assets/svgs/MoreMenuSVG';
import MoreSvgIcon from '../../assets/svgs/MoreSvgIcon';
import {fonts} from '../../../assets/fonts/fonts';

const ItemRow = props => {
  const priceView = type => {
    return (
      <View style={{flex: 1}}>
        <Text
          style={{
            fontFamily: fonts.InterRegular,
            fontWeight: '400',
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          ItemRow
        </Text>
        <Text
          style={{
            fontFamily: fonts.InterRegular,
            fontWeight: '700',
            color: themeProvide().black,
            marginTop: 4,
            fontSize: 12,
          }}>
          {getCurrenyPrice(Number(300))}
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
            Blenders Pride
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
            Whisky
          </Text>
        </View>
        <TouchableOpacity onPress={props.onMoreIconClick}>
          <MoreSvgIcon />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          marginVertical: 12,
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }}
      />
      <View style={{flexDirection: 'row'}}>
        {priceView()}
        {priceView()}
        {priceView()}
      </View>
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
