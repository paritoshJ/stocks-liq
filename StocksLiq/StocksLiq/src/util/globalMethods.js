import {Appearance, Linking, Platform} from 'react-native';
import lightTheme from '../themes/client-themes/default';
import I18n from '../localization/index';
import moment from 'moment';
import {PermissionsAndroid, Alert} from 'react-native';
import {API_LANG} from '../services/api_constants';
export const isDarkMode = () => {
  return Appearance.getColorScheme() === 'dark' ? false : false;
};

export const themeProvide = () => {
  return isDarkMode() ? lightTheme : lightTheme;
};

export const isEmpty = obj => {
  return obj && Object.keys(obj).length === 0;
};

// currency formate

function numberWithCommas(x) {
  let price = x > 0 ? x : 0;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const amountFormate = amount => {
  const amountWithoutComma = amount.toString().replace(',', '');
  return (
    I18n.t('currencySymbol') +
    numberWithCommas(
      Number(amountWithoutComma).toFixed(2).toLocaleString('en', 2),
    )
  );
};

export const titleCase = str => {
  //return str[0].toUpperCase() + str.slice(1).toLowerCase();
  if (str !== undefined && str !== null) {
    if (str.length > 0) {
      if (str.includes('HIPAA Patient Right')) {
        return str;
      }
      let arr = str.split(' ');
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        let strr = arr[i];
        newArr.push(strr.charAt(0).toUpperCase() + strr.slice(1).toLowerCase());
      }
      return newArr.join(' ');
    } else {
      return str;
    }
  } else {
    return '';
  }
};
export const dialCall = phoneNum => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNum}`;
  } else {
    phoneNumber = `telprompt:${phoneNum}`;
  }
  Linking.openURL(phoneNumber);
};

export const openURLs = Url => {
  Linking.openURL(Url).catch(err => console.error('Error', err));
};

export function isStringNotNull(key) {
  return key !== undefined && key != null && key !== '';
}

export function isArrayNullOrEmpty(array) {
  return array == null || array === undefined || array.length === 0;
}

export function isObjectNullOrUndefined(obj) {
  return (
    obj == null ||
    obj === undefined ||
    obj === 'null' ||
    Object.keys(obj).length === 0
  );
}

export const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const replaceHtml = str => {
  return isStringNotNull(str) ? str.replace(/<[^>]+>/g, '') : '';
};

export function getValue(key) {
  if (isStringNotNull(key)) {
    return key;
  }
  return 'N/A';
}
export function formatedString(key) {
  return key.replace(/(\r\n|\n|\r)/gm, '');
}
export const getRegex = paswrdRul => {
  const upperCase = paswrdRul?.NoOfUpperCaseReqd ? '(?=.*[A-Z])' : '';
  const numberCase = paswrdRul?.NoOfUpperCaseReqd ? '(?=.*[0-9])' : '';
  const symbolCase = paswrdRul?.NoOfUpperCaseReqd ? '(?=.*[!@#$%^&_*])' : '';
  let regString = '(?=.*[a-z])';
  if (upperCase) {
    regString.concat(upperCase);
  }
  if (numberCase) {
    regString.concat(numberCase);
  }
  if (symbolCase) {
    regString.concat(symbolCase);
  }
  const strongRegex =
    paswrdRul?.PasswordMinLength < paswrdRul?.PasswordMaxLength
      ? new RegExp(
          `^${regString}(?=.{${paswrdRul?.PasswordMinLength},${paswrdRul?.PasswordMaxLength}})`,
        )
      : new RegExp(`^${regString}(?=.{0,})`);
  return strongRegex;
};

export const getShareExcludeActivity = () => {
  return Platform.select({
    ios: [
      'com.apple.UIKit.activity.PostToTwitter',
      'com.toyopagroup.picaboo.share', // Snapchat!
      // 'net.whatsapp.WhatsApp.ShareExtension',
      // 'com.apple.CloudDocsUI.AddToiCloudDrive',
      // 'com.apple.mobilenotes.SharingExtension',
      // 'com.google.Gmail.ShareExtension',
      // 'com.google.inbox.ShareExtension',
      // 'com.google.hangouts.ShareExtension',
      // 'net.whatsapp.WhatsApp.ShareExtension',

      'com.apple.reminders.RemindersEditorExtension',
      'com.apple.mobilenotes.SharingExtension',
      'com.amazon.Lassen.SendToKindleExtension',
      'com.google.chrome.ios.ShareExtension',
      'com.google.Drive.ShareExtension',
      'com.iwilab.KakaoTalk.Share',
      'com.hammerandchisel.discord.Share',
      'com.facebook.Messenger.ShareExtension',
      'com.nhncorp.NaverSearch.ShareExtension',
      'com.linkedin.LinkedIn.ShareExtension',
      'com.tinyspeck.chatlyio.share', // Slack!
      'ph.telegra.Telegraph.Share',
      'com.fogcreek.trello.trelloshare',
      'com.hammerandchisel.discord.Share',
      'com.riffsy.RiffsyKeyboard.RiffsyShareExtension', //GIF Keyboard by Tenor
      'com.ifttt.ifttt.share',
      'com.getdropbox.Dropbox.ActionExtension',
      'wefwef.YammerShare',
      'pinterest.ShareExtension',
      'pinterest.ActionExtension',
      'us.zoom.videomeetings.Extension',
    ],
    android: [
      'com.google.android.gm',
      'com.microsoft.teams',
      // 'com.microsoft.office.outlook',
      'com.facebook.katana',
      'com.facebook.lite',
      'com.facebook.orca',
      'com.instagram.android',
      'com.instagram.lite',
      // 'com.whatsapp',
      'com.twitter.android',
      'com.linkedin.android',
    ],
  });
};

export const askPermission = async platform => {
  if (platform === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE']
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return true;
  }
};
export function findPercentage(min, max) {
  let defaultPercentage = 0;

  if (min > 0) {
    defaultPercentage = min / max;
  }

  if (defaultPercentage > 1) {
    defaultPercentage = 1;
  }
  return defaultPercentage;
}

export const convertStringToBase64 = str => {
  if (isStringNotNull(str)) {
    // return Buffer.from(str).toString('base64');
  }
};

export const twoOptionsAlertFunction = (msg, onYesPress) => {
  //function to make two option alert
  Alert.alert(
    //This is title
    I18n.t('appName'),
    //This is body text
    msg,
    [
      {text: 'OK', onPress: onYesPress},
      {
        text: 'Cancel',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
    ],
    {cancelable: false},
    //on clicking out side, Alert will not dismiss
  );
};

export const getFirstLetterCaps = str => {
  if (str && str.length > 0) {
    const matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    let acronym = matches.join(''); // JSON
    acronym = acronym.length > 4 ? acronym.substring(0, 4) : acronym;
    return acronym.toUpperCase();
  } else {
    return 'N/A';
  }
};

export const showMessageAlert = (msg, onYesPress = () => {}) => {
  //function to make two option alert
  Alert.alert(
    //This is title
    I18n.t('appName'),
    //This is body text
    msg,
    [{text: 'OK', onPress: onYesPress, style: 'cancel'}],
    {cancelable: false},
    //on clicking out side, Alert will not dismiss
  );
};

export const getLanguage = () => {
  // return langType === API_LANG.ENGLISH ?  "en" :''
  return API_LANG.ENGLISH;
  // return API_LANG.HINDI;
};
