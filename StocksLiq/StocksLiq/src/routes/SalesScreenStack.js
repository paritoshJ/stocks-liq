import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InventoryScreen from '../screens/Inventory/index';
import AddInventoryScreen from '../screens/Inventory/AddInventory/index';

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
        name="InventoryScreen"
        component={InventoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <InventoryStack.Screen
        name="AddInventoryScreen"
        component={AddInventoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </InventoryStack.Navigator>
  );
};

export default SalesScreenStack;
