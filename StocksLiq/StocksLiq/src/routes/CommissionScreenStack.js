import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CommissionScreen from '../screens/SalesmanRoute/Commission/index';
import AddCommissionScreen from '../screens/SalesmanRoute/Commission/AddCommission/index';
import SearchPage from '../common/SearchPage/index';

const CommissionStack = createStackNavigator();
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
    <CommissionStack.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <CommissionStack.Screen
        name="CommissionScreen"
        component={CommissionScreen}
        options={{
          headerShown: false,
        }}
      />
      <CommissionStack.Screen
        name="AddCommissionScreen"
        component={AddCommissionScreen}
        options={{
          headerShown: false,
        }}
      />
      <CommissionStack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          headerShown: false,
        }}
      />
    </CommissionStack.Navigator>
  );
};

export default CommissionScreenStack;
