import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

type Langs = 'en' | 'ru';

const supportedLngs: Langs[] = ['en', 'ru'];

export const i18Namespace = {
	analytics: 'analytics',
	auth: 'auth',
	docs: 'docs',
	interviewHistory: 'interviewHistory',
	interviewQuiz: 'interviewQuiz',
	interviewQuizCreate: 'interviewQuizCreate',
	interviewQuizResult: 'interviewQuizResult',
	interviewStatistics: 'interviewStatistics',
	landing: 'landing',
	main: 'main',
	onboarding: 'onboarding',
	profile: 'profile',
	questions: 'questions',
	resources: 'resources',
	skill: 'skill',
	specialization: 'specialization',
	subscription: 'subscription',
	subscriptionCard: 'subscriptionCard',
	translation: 'translation',
	user: 'user',
	collection: 'collection',
	marketplace: 'marketplace',
	companies: 'companies',
	editor: 'editor',
	guru: 'guru',
	media: 'media',
};

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
