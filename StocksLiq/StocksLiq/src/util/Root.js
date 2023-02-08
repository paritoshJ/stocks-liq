import React from 'react';
import LoginScreen from '../screens/Login/index';
import OtpScreen from '../screens/Otp/index';
import SignUpScreen from '../screens/Register/index';
import PlanScreen from '../screens/Plan/index';
import RegisterSuccessScreen from '../screens/SuccessScreen/index';
// import ForGotUserName from '../screens/forgotUser';
// import OTPValidation from '../screens/otpValidate';
// import ForGotPassword from '../screens/forgotPassword';
// import ResetPassword from '../screens/forgotPassword/resetPassword';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
function RootNavigator() {
  // console.log("RootNavigator",'RootNavigator');
  return (
    <Stack.Navigator initialRouteName={LoginScreen}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlanScreen"
        component={PlanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterSuccessScreen"
        component={RegisterSuccessScreen}
        options={{headerShown: false}}
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
    </Stack.Navigator>
  );
}
export default RootNavigator;
