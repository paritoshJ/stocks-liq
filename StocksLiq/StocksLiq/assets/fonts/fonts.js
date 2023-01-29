import {Dimensions, Platform, PixelRatio, I18nManager} from 'react-native';
const DEFAULT_RESIZE_SCREEN = 375;
/** getting window height and width **/
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
/** function does resizing of font's as per platform */
export function fontResize(fontSize) {
  const scale = SCREEN_WIDTH / DEFAULT_RESIZE_SCREEN;
  const newSize = fontSize * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}

/** exports fonts available **/
export const fonts = {
  InterBlack: 'Inter-Black',
  InterBold: 'Inter-Bold',
  InterExtraBold: 'Inter-ExtraBold',
  InterLight: 'Inter-Light',
  InterMedium: 'Inter-Medium',
  InterRegular: 'Inter-Regular',
  InterSemiBold: 'Inter-SemiBold',
  InterThin: 'Inter-Thin',
};
