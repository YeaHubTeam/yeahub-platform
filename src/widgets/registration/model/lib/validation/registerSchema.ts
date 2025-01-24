import * as yup from 'yup';
import YupPassword from 'yup-password';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { passwordRules } from '@/shared/constants/regexp';

YupPassword(yup);

export const registerSchema = yup.object().shape({
	firstName: yup
		.string()
		.trim()
		.min(2, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
		.max(30, ({ max }) => i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: max }))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	lastName: yup
		.string()
		.trim()
		.min(2, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
		.max(30, ({ max }) => i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: max }))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	email: yup
		.string()
		.email(i18n.t(Translation.VALIDATION_EMAIL))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	password: yup
		.string()
		.min(8, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
		.matches(passwordRules, () => i18n.t(Translation.VALIDATION_PASSWORD_WEAK))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], () => i18n.t(Translation.VALIDATION_PASSWORD_SIMILAR))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	privacyConsent: yup
		.boolean()
		.oneOf([true], () => i18n.t(Translation.VALIDATION_PRIVACY))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	offerConsent: yup
		.boolean()
		.oneOf([true], () => i18n.t(Translation.VALIDATION_PRIVACY))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
