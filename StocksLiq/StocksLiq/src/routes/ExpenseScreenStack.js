import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ExpenseScreen from '../screens/Expense/index';
import AddExpenseScreen from '../screens/Expense/AddExpense/index';

const ExpenseStack = createStackNavigator();
const ExpenseScreenStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MyProfile') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <ExpenseStack.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <ExpenseStack.Screen
        name="ExpenseScreen"
        component={ExpenseScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExpenseStack.Screen
        name="AddExpenseScreen"
        component={AddExpenseScreen}
        options={{
          headerShown: false,
        }}
      />
    </ExpenseStack.Navigator>
  );
};

export default ExpenseScreenStack;
