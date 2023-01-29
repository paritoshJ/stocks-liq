import {View, StyleSheet} from 'react-native';
import React from 'react';
import {themeProvide} from '../util/globalMethods';

const BeforeLoginWrapperView = props => {
  const Icon = props.icon;
  const LayoutView = props.layoutView;
  return (
    <View style={styles.mainView}>
      <View style={styles.firstView}>{Icon && <Icon />}</View>
      {LayoutView && (
        <View style={styles.secondView}>
          <LayoutView />
        </View>
      )}
    </View>
  );
};

export default BeforeLoginWrapperView;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: themeProvide().primary_back,
  },
  firstView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondView: {
    flex: 1,
    backgroundColor: themeProvide().white,
  },
});
