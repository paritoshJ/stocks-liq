import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {themeProvide} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';

const ReportsScreen = props => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: themeProvide().primary_back}}>
      <View style={{flex: 1, backgroundColor: themeProvide().page_back}}>
        <ToolbarHeader
          isLogo={true}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          logoToolbarType={true}
        />
        <Text>DashboardScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ReportsScreen;
