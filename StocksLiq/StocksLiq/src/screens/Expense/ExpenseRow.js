import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MoreMenuSvg from '../../assets/svgs/MoreMenuSVG';
import DeleteIconSvg from '../../assets/svgs/DeleteIconSvg';
import {fonts} from '../../../assets/fonts/fonts';
import I18n from 'i18n-js';
import moment from 'moment';

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
            {I18n.t('addedOn', {
              date: moment(props?.item?.created_at).format('Do MMM YY h:mm a'),
            })}
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
        {/* <TouchableOpacity onPress={props.onMoreIconClick}>
          <DeleteIconSvg />
        </TouchableOpacity> */}
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
