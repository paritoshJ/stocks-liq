import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MyProfileSideMenuSvg from '../../assets/svgs/MyProfileSideMenuSvg';
import MoreSvgIcon from '../../assets/svgs/MoreSvgIcon';
import {fonts} from '../../../assets/fonts/fonts';

const SalesmanRow = props => {
  return (
    <TouchableOpacity onPress={props.onItemClick} style={styles.mainView}>
      <View style={{flexDirection: 'row',padding: 12, alignItems: 'center',}}>
        <MyProfileSideMenuSvg />
        <View style={{flex: 1,marginHorizontal:12}}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fonts.InterRegular,
              fontWeight: '700',
              fontSize: 14,
            }}>
            John Doe
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
            +91 8988734230
          </Text>
        </View>
        <TouchableOpacity onPress={props.onMoreIconClick}>
          <MoreSvgIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SalesmanRow;
const styles = StyleSheet.create({
  mainView: {
    borderRadius: 12,
    marginTop: 12,
    justifyContent: 'center',
    backgroundColor: themeProvide().white,
  },
});
