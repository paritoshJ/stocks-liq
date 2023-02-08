import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {themeProvide} from '../../util/globalMethods';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const Loader = (props) => {
  const {
    loading,
    color = themeProvide().primary_1,
    size = 32,
    bgColor = themeProvide().transParent,
    isTransparent = false,
    ScreenHeight = false,
    navigation,
  } = props;
  return (
    loading && (
      <View style={styles.viewStyle}>
        {loading && <ActivityIndicator color={color} size={size} />}
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  viewStyle: {
    position: 'absolute',
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000060',
  },
  modalBackground: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00000040',
    width: '100%',
  },
  transparentWrapper: {
    backgroundColor: themeProvide().status_text,
    height: 100,
    width: 100,
    display: 'flex',
  },
  viewWrapper: {
    height: '100%',
    width: '100%',
    marginBottom: 2,
  },
  common: {
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 2,
  },
});
