import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {themeProvide, getCurrenyPrice} from '../../util/globalMethods';
import MoreMenuSvg from '../../assets/svgs/MoreMenuSVG';
import {fonts} from '../../../assets/fonts/fonts';

const SearchProductRow = props => {
  return (
    <TouchableOpacity onPress={props.onItemClick} style={styles.mainView}>
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
        {props?.item?.category?.lang_name && (
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
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchProductRow;
const styles = StyleSheet.create({
  mainView: {
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    backgroundColor: themeProvide().white,
  },
});
