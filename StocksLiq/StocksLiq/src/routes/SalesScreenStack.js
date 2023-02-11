import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SalesScreen from '../screens/SalesmanRoute/Sales/index';
import AddSalesScreen from '../screens/SalesmanRoute/Sales/AddSales/AddSalesScreen';

const InventoryStack = createStackNavigator();
const SalesScreenStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MyProfile') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <InventoryStack.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <InventoryStack.Screen
        name="SalesScreen"
        component={SalesScreen}
        options={{
          headerShown: false,
        }}
      />
      <InventoryStack.Screen
        name="AddSalesScreen"
        component={AddSalesScreen}
        options={{
          headerShown: false,
        }}
      />
    </InventoryStack.Navigator>
  );
};

export default SalesScreenStack;
