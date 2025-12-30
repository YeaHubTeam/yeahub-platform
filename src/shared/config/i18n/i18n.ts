import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { i18Namespace } from './i18nNamespaces';

type Langs = 'en' | 'ru';

const supportedLngs: Langs[] = ['en', 'ru'];

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		defaultNS: [i18Namespace.translation, i18Namespace.user],
		fallbackLng: 'ru',
		debug: __IS_DEV__,
		interpolation: {
			escapeValue: false,
		},
		supportedLngs,
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
	});

export default i18n;
