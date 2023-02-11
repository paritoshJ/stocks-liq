import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CommissionScreen from '../screens/SalesmanRoute/Commission/index';
import AddCommissionScreen from '../screens/SalesmanRoute/Commission/AddCommission/index';

const ReportStack = createStackNavigator();
const CommissionScreenStack = ({navigation, route}) => {
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
        name="CommissionScreen"
        component={CommissionScreen}
        options={{
          headerShown: false,
        }}
      />
      <ReportStack.Screen
        name="AddCommissionScreen"
        component={AddCommissionScreen}
        options={{
          headerShown: false,
        }}
      />
    </ReportStack.Navigator>
  );
};

export default CommissionScreenStack;
