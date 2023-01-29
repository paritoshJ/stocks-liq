import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {ImageBackground, StatusBar, Keyboard, Text} from 'react-native';
import {View, Animated, Easing, Image} from 'react-native';
// import LottieView from 'lottie-react-native';
import {themeProvide} from '../../util/globalMethods.js';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SplashLogoSvg from '../../assets/svgs/splashLogoSvg.js';

const SplashScreen = props => {
  const bottomNavColorChange = async (color, isLightTheme) => {
    try {
      await changeNavigationBarColor(color, isLightTheme);
    } catch (e) {
      console.log(e); // {success: false}
    }
  };
  useEffect(() => {
    bottomNavColorChange(themeProvide().primary_1, false);

    return () => {
      bottomNavColorChange(themeProvide().Background_secondary, true);
    };
  }, []);

  useEffect(() => {
    // unsubscribe();
    console.log('SPLASH SCREEN CALLED');
    getLocalStorageData();
  }, []);

  const getLocalStorageData = () => {
    let access_token = null; // await getStore('loginToken');
    if (access_token == null) {
      setTimeout(function () {
        props.isLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeProvide().white}
      />
      <View
        style={{
          backgroundColor: themeProvide().white,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <SplashLogoSvg />
      </View>
    </>
  );
};

export default SplashScreen;
