import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ItemsScreen from '../screens/Items/index';
import AddItemScreen from '../screens/Items/AddItems/index';

const ItemStack = createStackNavigator();
const ItemScreenStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'AddItemScreen') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <ItemStack.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <ItemStack.Screen
        name="ItemsScreen"
        component={ItemsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ItemStack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{
          headerShown: false,
        }}
      />
    </ItemStack.Navigator>
  );
};

export default ItemScreenStack;
