import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getFirstLetterCaps,
  isObjectNullOrUndefined,
  isStringNotNull,
  showMessageAlert,
  themeProvide,
} from '../../util/globalMethods';
import ToolbarHeader from '../../common/ToolbarHeader';
import I18n from '../../localization';
import {fonts} from '../../../assets/fonts/fonts';
import {doGetUserProfile, doEditUserProfile} from './Action';
import {doSaveUser} from '../Login/Action';
import {connect} from 'react-redux';
import Loader from '../../common/loader/Loader';
import ThemeButton from '../../common/ThemeButton';
import {TextInput} from 'react-native-paper';
import {store} from '../../store/configureStore';

const EditProfileScreen = props => {
  const userDetails = store?.getState()?.LoginReducer?.userDetails;

  const [isLoading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState(userDetails?.store_name);
  const [firstName, setFirstName] = useState(userDetails?.first_name);
  const [lastName, setLastName] = useState(userDetails?.last_name);

  const renderImageBack = () => {
    return (
      <ImageBackground style={styles.imageBack}>
        <Text style={styles.imageText}>{getFirstLetterCaps(storeName)}</Text>
      </ImageBackground>
    );
  };
  const renderStoreName = () => {
    return (
      <>
        <Text style={styles.storeText}>{'Upload photo'}</Text>
      </>
    );
  };

  const renderDevider = () => {
    return <View style={styles.renderDevider} />;
  };
  const callUpdateApi = () => {
    let msg = '';
    if (!isStringNotNull(storeName)) {
      msg = I18n.t('storeNameError');
    } else if (!isStringNotNull(firstName)) {
      msg = I18n.t('firstNameError');
    } else if (!isStringNotNull(lastName)) {
      msg = I18n.t('lastNameError');
    }

    if (isStringNotNull(msg)) {
      showMessageAlert();
    }
    setLoading(true);
    props.doEditUserProfile({
      paramData: {
        first_name: firstName,
        last_name: lastName,
        store_name: storeName,
        // 'profile_image': '',
      },
      onSuccess: (isSuccess, status, response) => {
        setLoading(false);
        if (isSuccess && !isObjectNullOrUndefined(response.data)) {
          console.log('data', response.data);
          props.doSaveUser(response.data);
        }
        showMessageAlert(response?.message);
      },
    });
  };
  const renderButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <ThemeButton
          buttonstyle={[styles.buttonstyle, {marginRight: 8}]}
          textStyle={styles.buttonTextstyle}
          onPress={() => {
            props.navigation.goBack();
          }}
          buttonTitle={I18n.t('cancel')}
        />
        <ThemeButton
          buttonstyle={[styles.buttonstyle1, {marginLeft: 8}]}
          onPress={() => {
            callUpdateApi();
          }}
          buttonTitle={I18n.t('update')}
        />
      </View>
    );
  };
  const _onChangeText = (key, value) => {
    if (key === 'storeName') {
      setStoreName(value);
    } else if (key === 'firstName') {
      setFirstName(value);
    } else if (key === 'lastName') {
      setLastName(value);
    }
  };
  const renderInputView = (label, value, key) => {
    return (
      <View style={styles.renderInputView}>
        <TextInput
          label={label}
          placeholder={`Enter ${label}`}
          value={value}
          dense={false}
          mode={'outlined'}
          style={styles.inputStyle}
          error={false}
          theme={{
            colors: {
              primary: themeProvide().black,
              error: themeProvide().primary,
            },
          }}
          placeholderColor={themeProvide().borderBlack}
          activeUnderlineColor={themeProvide().black}
          underlineColorAndroid={renderDevider()}
          onChangeText={value1 => _onChangeText(key, value1)}
        />
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
          {renderInputView(I18n.t('yourStoreName'), storeName, 'storeName')}
          {renderInputView(I18n.t('yourFirstName'), firstName, 'firstName')}
          {renderInputView(I18n.t('yourLastName'), lastName, 'lastName')}
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
  doEditUserProfile: doEditUserProfile,
  doSaveUser: doSaveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);

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
    color: themeProvide().primary,
    alignSelf: 'center',
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '700',
    textDecorationLine: 'underline',
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
  renderInputView: {marginTop: 24},
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
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginTop: 24,
    borderColor: themeProvide().primary,
    borderWidth: 1,
  },
  buttonstyle1: {
    borderRadius: 12,
    flex: 1,
  },
  buttonTextstyle: {
    color: themeProvide().primary,
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.InterRegular,
    paddingHorizontal: 0,
  },
});
