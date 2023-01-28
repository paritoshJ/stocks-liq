import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {ImageBackground, StatusBar, Keyboard} from 'react-native';
import {View, Animated, Easing, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {themeProvide} from '../../util/globalMethods.js';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const SplashScreen = ({props, isSignedIn, isLoading}) => {
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
        isLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeProvide().primary_1}
      />
      <View style={{backgroundColor: 'red'}}>
        {/* <LottieView
        source={require('../../Animation/animation.json')}
        progress={progress}
        resizeMode="cover"
      /> */}
      </View>
    </>
  );
};

export default SplashScreen;
