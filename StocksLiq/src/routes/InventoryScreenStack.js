import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InventoryScreen from '../screens/Inventory/index';

const InventoryStack = createStackNavigator();
const InventoryScreenStack = ({navigation, route}) => {
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
    </InventoryStack.Navigator>
  );
};

export default InventoryScreenStack;
