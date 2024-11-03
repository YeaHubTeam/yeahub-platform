import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

type Langs = 'en' | 'ru';

const supportedLngs: Langs[] = ['en', 'ru'];

export const i18Namespace = {
	translation: 'translation',
	auth: 'auth',
	interview: 'interview',
	interviewQuiz: 'interviewQuiz',
	interviewQuizResult: 'interviewQuizResult',
	interviewStatistics: 'interviewStatistics',
	mainPage: 'mainPage',
	profile: 'profile',
	questions: 'questions',
	interviewHistory: 'interviewHistory',
	specialization: 'specialization',
	validation: 'validation',
	skill: 'skill',
	a11y: 'a11y',
	landing: 'landing',
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
