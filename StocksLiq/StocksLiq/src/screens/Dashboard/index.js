import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {themeProvide} from '../../util/globalMethods';

const DashboardScreen = props => {
  useEffect(() => {
    // props.navigation.openDrawer();
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: themeProvide().primary_back}}>
      <View style={{flex: 1, backgroundColor: themeProvide().page_back}}>
        <Text>DashboardScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
