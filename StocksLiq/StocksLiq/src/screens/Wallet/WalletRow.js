import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MyProfileSideMenuSvg from '../../assets/svgs/MyProfileSideMenuSvg';
import MoreSvgIcon from '../../assets/svgs/MoreSvgIcon';
import {fonts} from '../../../assets/fonts/fonts';
import DebitSVG from '../../assets/svgs/DebitSVG';
import CreaditSVG from '../../assets/svgs/CreaditSVG';
import I18n from 'i18n-js';
import moment from 'moment';

const WalletRow = props => {
  return (
    <TouchableOpacity onPress={props.onItemClick} style={styles.mainView}>
      <View style={{flexDirection: 'row', padding: 12}}>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '700',
              fontSize: 14,
            }}>
            {props?.item?.upi_id ?? props?.item?.user_name ?? 'N/A'}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '300',
              fontSize: 12,
              marginTop: 4,
              color: themeProvide().black,
            }}>
            {I18n.t('addedOn', {
              date: moment(props?.item?.created_at).format('Do MMM YY h:mm a'),
            })}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}} onPress={props.onMoreIconClick}>
          {props.item.type !== 'earn' ? <DebitSVG /> : <CreaditSVG />}
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '700',
              marginHorizontal: 4,
              fontSize: 14,
            }}>
            {getCurrenyPrice(Number(props?.item?.amount ?? 0))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WalletRow;
const styles = StyleSheet.create({
  mainView: {
    borderRadius: 12,
    marginTop: 12,
    justifyContent: 'center',
    backgroundColor: themeProvide().white,
  },
});
