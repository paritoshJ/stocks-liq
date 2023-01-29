/* eslint-disable no-undef */
/**
 * Alshaya Framework
 * Version 0.1
 * Filename: Localization index.js
 * created on 25 Dec 2019
 */
import I18n from 'i18n-js';
// import {store} from './redux/store';
import * as RNLocalize from 'react-native-localize';
import en from './en';
import hi from './hi';

/*
 * Setting Language
 */

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = 'en';
}

I18n.fallbacks = true;

I18n.translations = {
  en: en,
};

export default I18n;
