import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
// import Registration from '../screens/Registration/Registration';
// import ForGotUserName from '../screens/forgotUser';
// import OTPValidation from '../screens/otpValidate';
// import ForGotPassword from '../screens/forgotPassword';
// import ResetPassword from '../screens/forgotPassword/resetPassword';

const OnBoarding = createStackNavigator();
const RootNavigator = ({navigation}) => {
  return (
    <OnBoarding.Navigator initialRouteName={LoginScreen}>
      <OnBoarding.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: true}}
      />
      {/* <OnBoarding.Screen name="Registration" component={Registration} /> */}
      {/* <OnBoarding.Screen
        name="ForGotUserName"
        component={ForGotUserName}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <OnBoarding.Screen
        name="ForGotPassword"
        component={ForGotPassword}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <OnBoarding.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <OnBoarding.Screen
        name="OTPValidation"
        component={OTPValidation}
        options={{headerShown: false, tabBarVisible: false}}
      /> */}
    </OnBoarding.Navigator>
  );
};
export default RootNavigator;
