import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getFirstLetterCaps,
  isStringNotNull,
  showMessageAlert,
  themeProvide,
  twoOptionsAlertFunction,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import {doGetUserProfile} from '../Profile/Action';
import {doDeleteUser, setLoggedIn, doSaveUser} from '../Login/Action';
import {connect} from 'react-redux';
import Loader from '../../common/loader/Loader';
import ProfileSvg from '../../assets/svgs/ProfileSvg';
import ReferFriendSvg from '../../assets/svgs/ReferFriendSvg';
import ThemeButton from '../../common/ThemeButton';
import {store} from '../../store/configureStore';

const ProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  let userDetails = store?.getState()?.LoginReducer?.userDetails;
  const [isImageLoad, setImageLoad] = useState(false);
  const [path, setImagePath] = useState(userDetails?.profile_image ?? '');
  const [storeName, setStoreName] = useState(userDetails?.store_name);

  const renderImageBack = () => {
    return (
      <ImageBackground style={styles.imageBack}>
        {!isStringNotNull(path) ? (
          <Text style={styles.imageText}>{getFirstLetterCaps(storeName)}</Text>
        ) : (
          <Image
            source={{uri: path}}
            onLoadStart={e => {
              setImageLoad(true);
            }}
            onLoad={e => {
              setImageLoad(true);
            }}
            onLoadEnd={e => setImageLoad(false)}
            onError={error => {
              setImageLoad(false);
              setImagePath('');
            }}
            style={{overflow: 'hidden', width: 64, height: 64}}
          />
        )}
        {isStringNotNull(path) && isImageLoad && (
          <Loader
            loading={isImageLoad}
            isTransparent={true}
            color={themeProvide().primary}
            size={24}
          />
        )}
      </ImageBackground>
    );
  };
  const renderStoreName = () => {
    return (
      <>
        <Text style={styles.storeText}>{userDetails?.store_name}</Text>
        <Text style={styles.storeExampleText}>
          {'EXP Date : Joined May 2022'}
        </Text>
      </>
    );
  };

  const renderDevider = () => {
    return <View style={styles.renderDevider} />;
  };
  const renderButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyle, {marginRight: 8}]}
          textStyle={styles.buttonTextstyle}
          onPress={() => {
            props.navigation.navigate('EditProfileScreen');
          }}
          buttonTitle={I18n.t('editProfile')}
        />
        <ThemeButton
          buttonstyle={[styles.buttonstyle, {marginLeft: 8}]}
          textStyle={styles.buttonTextstyle}
          onPress={() => {
            onDeleteClick();
          }}
          buttonTitle={I18n.t('deleteAccount')}
        />
      </View>
    );
  };
  const onDeleteClick = () => {
    twoOptionsAlertFunction(I18n.t('deleteText'), () => {
      setIsLoading(true);
      props.doDeleteUser({
        paramData: {device_type: Platform.OS, device_token: ''},
        onSuccess: (isSuccess, status, data) => {
          console.log('data', data);
          setIsLoading(false);

          if (isSuccess) {
            props.doSaveUser(null);
            props.setLoggedIn(false);
          }

          showMessageAlert(data);
        },
      });
    });
  };
  const renderDetailView = (iconView, label, value) => {
    return (
      <View style={styles.renderDetailView}>
        {iconView}
        <View style={styles.renderInputView}>
          <Text style={styles.inputLabel}>{label}</Text>
          <Text style={styles.inputValue}>{value}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <ToolbarHeader
          isLogo={false}
          backgroundColor={themeProvide().page_back}
          title={I18n.t('myProfile_menu')}
          onPress={() => {
            props.navigation.goBack();
          }}
          logoToolbarType={false}
        />
        <View style={styles.paddingView}>
          {renderImageBack()}
          {renderStoreName()}
          {renderDevider()}
          {renderDetailView(
            <ProfileSvg />,
            I18n.t('ownerName'),
            `${userDetails?.first_name} ${userDetails?.last_name}`,
          )}
          {renderDevider()}
          {renderDetailView(
            <ReferFriendSvg />,
            I18n.t('referralCode'),
            userDetails?.referral_code
              ? `#${userDetails?.referral_code}`
              : 'N/A',
          )}
          {renderDevider()}
          {renderButtonView()}
        </View>
      </View>
      <Loader
        loading={isLoading}
        isTransparent={true}
        color={themeProvide().primary}
        size={32}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  doGetUserProfile: doGetUserProfile,
  doDeleteUser: doDeleteUser,
  setLoggedIn: setLoggedIn,
  doSaveUser: doSaveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: themeProvide().page_back},
  safeView: {flex: 1, backgroundColor: themeProvide().page_back},
  imageBack: {
    backgroundColor: themeProvide().primary,
    width: 64,
    height: 64,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 32,
    marginTop: 24,
    marginBottom: 16,
  },
  imageText: {
    color: themeProvide().white,
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '700',
    justifyContent: 'center',
  },
  storeText: {
    color: themeProvide().black,
    alignSelf: 'center',
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '700',
    justifyContent: 'center',
  },
  storeExampleText: {
    color: themeProvide().black,
    alignSelf: 'center',
    marginHorizontal: 10,
    opacity: 0.5,
    fontSize: 14,
    marginVertical: 4,
    fontWeight: '400',
    justifyContent: 'center',
  },
  renderDevider: {
    backgroundColor: themeProvide().black,
    opacity: 0.06,
    height: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  paddingView: {
    padding: 20,
  },
  renderDetailView: {flexDirection: 'row', alignItems: 'center'},
  renderInputView: {marginHorizontal: 12},
  inputLabel: {fontSize: 12},
  inputValue: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
    fontFamily: fonts.InterRegular,
  },
  buttonView: {
    flexDirection: 'row',
  },
  buttonstyle: {
    backgroundColor: 'transparent',
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginTop: 24,
    borderColor: themeProvide().primary,
    borderWidth: 1,
  },
  buttonTextstyle: {
    color: themeProvide().primary,
  },
});
