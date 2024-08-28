import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

type Langs = 'en' | 'ru';

const supportedLngs: Langs[] = ['en', 'ru'];

export const i18Namespace = {
	translation: 'translation',
	interview: 'interview',
	interviewQuiz: 'interviewQuiz',
	interviewQuizResult: 'interviewQuizResult',
	interviewStatistics: 'interviewStatistics',
	profile: 'profile',
	interviewHistory: 'interviewHistory',
	specialization: 'specialization',
};

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
		supportedLngs,
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
	});

export default i18n;
