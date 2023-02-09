import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MoreMenuSvg from '../../assets/svgs/MoreMenuSVG';
import MoreSvgIcon from '../../assets/svgs/MoreSvgIcon';
import {fonts} from '../../../assets/fonts/fonts';

const ExpenseRow = props => {
  const priceView = () => {
    return (
      <View style={{flex: 1}}>
        <View>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '900',
              color: themeProvide().headerBlack,
              marginTop: 4,
              fontSize: 18,
            }}>
            {getCurrenyPrice(Number(props?.item?.amount))}
          </Text>
          <Text
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '400',
              fontSize: 10,
              marginTop: 4,
              color: 'rgba(0, 0, 0, 0.5)',
            }}>
            Added on 20 Jan, 22 at 5:12Pm
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
            {props?.item?.name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '400',
              fontSize: 14,
              marginTop: 4,
              color: themeProvide().black,
            }}>
            {props?.item?.remark}
          </Text>
        </View>
        <TouchableOpacity onPress={props.onMoreIconClick}>
          <MoreSvgIcon />
        </TouchableOpacity>
      </View>
      {priceView()}
    </TouchableOpacity>
  );
};

export default ExpenseRow;
const styles = StyleSheet.create({
  mainView: {
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    backgroundColor: themeProvide().white,
  },
});
