import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  ImageBackground,
  StatusBar,
  Keyboard,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View, Animated, Easing, Image} from 'react-native';
// import LottieView from 'lottie-react-native';
import {
  changeLanguage,
  isStringNotNull,
  themeProvide,
} from '../../util/globalMethods.js';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SplashLogoSvg from '../../assets/svgs/splashLogoSvg.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoSvg from '../../assets/svgs/logoSvg';
import ThemeButton from '../../common/ThemeButton.js';
import I18n from 'i18n-js';
import {fonts} from '../../../assets/fonts/fonts.js';
import RightArrow from '../../assets/svgs/RightArrow.js';
import {API_LANG} from '../../services/api_constants.js';

const SplashScreen = props => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [selectedTab, setSelectedTab] = useState('');

  const bottomNavColorChange = async (color, isLightTheme) => {
    try {
      changeNavigationBarColor(color, isLightTheme);
    } catch (e) {
      console.log(e); // {success: false}
    }
  };
  useEffect(() => {
    bottomNavColorChange(themeProvide().primary_back, false);

    return () => {
      bottomNavColorChange(themeProvide().primary_back, true);
    };
  }, []);

  useEffect(() => {
    // unsubscribe();
    console.log('SPLASH SCREEN CALLED');
    getLocalStorageData();
  }, []);

  const getLocalStorageData = async () => {
    const hasFirstLaunched = await AsyncStorage.getItem('@user_language');
    console.log('स्वागत', hasFirstLaunched);
    let access_token = null; // await getStore('loginToken');
    if (access_token == null) {
      setTimeout(() => {
        if (hasFirstLaunched === null) {
          setIsFirstLaunch(true);
        } else {
          changeLanguage(hasFirstLaunched);
          props.isLoading(false);
        }
        // props.isLoading(false);
      }, 2000);
    }
  };
  const renderLanguages = () => {
    return (
      <>
        <Text style={styles.welcomeText}>{I18n.t('selectLanguage')}</Text>
        <TouchableOpacity
          style={styles.langSelect}
          onPress={() => {
            setSelectedTab('English');
          }}
          {...props}>
          <Text
            style={[
              styles.loginOrSignUpText,
              {
                fontWeight: selectedTab === 'English' ? '700' : '400',
                color:
                  selectedTab === 'English'
                    ? themeProvide().primary
                    : themeProvide().black,
              },
            ]}>
            {I18n.t('englishLang')}
          </Text>
          {selectedTab === 'English' && <RightArrow />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langSelect}
          onPress={() => {
            setSelectedTab('Hindi');
          }}
          {...props}>
          <Text
            style={[
              styles.loginOrSignUpText,
              {
                fontWeight: selectedTab === 'Hindi' ? '700' : '400',
                color:
                  selectedTab === 'Hindi'
                    ? themeProvide().primary
                    : themeProvide().black,
              },
            ]}>
            {I18n.t('hindiLang')}
          </Text>
          {selectedTab === 'Hindi' && <RightArrow />}
        </TouchableOpacity>
      </>
    );
  };
  const renderButton = () => {
    return (
      <ThemeButton
        onPress={() => {
          if (isStringNotNull(selectedTab)) {
            AsyncStorage.setItem(
              '@user_language',
              selectedTab === 'English' ? API_LANG.ENGLISH : API_LANG.HINDI,
            );
            changeLanguage(
              selectedTab === 'English' ? API_LANG.ENGLISH : API_LANG.HINDI,
            );
            props.isLoading(false);
          }
        }}
        buttonTitle={I18n.t('continue')}
      />
    );
  };
  const renderLogin = () => {
    return (
      <View>
        {renderLanguages()}
        {renderButton()}
      </View>
    );
  };
  const renderLanguage = () => {
    return (
      <View style={styles.mainView}>
        <View style={styles.firstView}>{renderIcon()}</View>
        <View style={styles.secondView}>{renderLogin()}</View>
      </View>
    );
  };
  const renderIcon = () => {
    return <LogoSvg />;
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeProvide().primary_back}
      />

      {isFirstLaunch ? (
        renderLanguage()
      ) : (
        <View
          style={{
            backgroundColor: themeProvide().white,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <SplashLogoSvg />
        </View>
      )}
    </>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  keyboardAwareScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: themeProvide().white,
    padding: 24,
  },
  langSelect: {
    marginVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: themeProvide().lightWhiteColor,
  },
  mainView: {
    flex: 1,
    backgroundColor: themeProvide().primary_back,
  },
  firstView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondView: {
    flex: 1,
    backgroundColor: themeProvide().white,
    padding: 20,
  },
  welcomeText: {
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  loginOrSignUpText: {
    fontFamily: fonts.InterRegular,
    color: themeProvide().black,
    paddingVertical: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  loginSignupView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineView: {
    flex: 1,
    height: 1,
    backgroundColor: themeProvide().black,
    // opacity: 0.16,
  },
});
