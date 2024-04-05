import i18n, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

type LangsFiles = 'translation';
type Langs = 'en' | 'ru';

const ns: LangsFiles[] = ['translation'];
const supportedLngs: Langs[] = ['en', 'ru'];

const resources: Resource = ns.reduce((acc: Resource, n) => {
	supportedLngs.forEach((lng) => {
		if (!acc[lng]) acc[lng] = {};
		acc[lng] = {
			...acc[lng],
			[n]: require(`../../../../public/locales/${lng}/${n}.json`),
		};
	});
	return acc;
}, {});

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		debug: __IS_DEV__,
		interpolation: {
			escapeValue: false,
		},
		ns,
		supportedLngs,
		resources,
	});

export default i18n;
