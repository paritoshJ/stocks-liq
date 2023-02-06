import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MyProfileSideMenuSvg from '../../assets/svgs/MyProfileSideMenuSvg';
import MoreSvgIcon from '../../assets/svgs/MoreSvgIcon';
import {fonts} from '../../../assets/fonts/fonts';
import DebitSVG from '../../assets/svgs/DebitSVG';
import CreaditSVG from '../../assets/svgs/CreaditSVG';

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
            John@ybl
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
            20Jan, 22 at 5:12Pm
          </Text>
        </View>
        <View style={{flexDirection: 'row'}} onPress={props.onMoreIconClick}>
          {true ? <DebitSVG /> : <CreaditSVG />}
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '700',
              marginHorizontal:4,
              fontSize: 14,
            }}>
            {getCurrenyPrice(Number(5400))}
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
