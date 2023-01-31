import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login/index';
import OtpScreen from '../screens/Otp/index';
import SignUpScreen from '../screens/Register/index';
import PlanScreen from '../screens/Plan/index';
import RegisterSuccessScreen from '../screens/SuccessScreen/index';
// import Registration from '../screens/Registration/Registration';
// import ForGotUserName from '../screens/forgotUser';
// import OTPValidation from '../screens/otpValidate';
// import ForGotPassword from '../screens/forgotPassword';
// import ResetPassword from '../screens/forgotPassword/resetPassword';

const OnBoarding = createStackNavigator();
const RootNavigator = () => {
  return (
    <OnBoarding.Navigator initialRouteName={LoginScreen}>
      <OnBoarding.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <OnBoarding.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <OnBoarding.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <OnBoarding.Screen
        name="PlanScreen"
        component={PlanScreen}
        options={{headerShown: false}}
      />
      <OnBoarding.Screen
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
    </OnBoarding.Navigator>
  );
};
export default RootNavigator;
