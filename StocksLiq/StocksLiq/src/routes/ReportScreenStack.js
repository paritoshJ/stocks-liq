import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ReportScreen from '../screens/Reports/index';
import ReportDetailScreen from '../screens/Reports/ReportDetailScreen';

const ReportStack = createStackNavigator();
const ReportScreenStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MyProfile') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <ReportStack.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <ReportStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerShown: false,
        }}
      />
      <ReportStack.Screen
        name="ReportDetailScreen"
        component={ReportDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </ReportStack.Navigator>
  );
};

export default ReportScreenStack;
