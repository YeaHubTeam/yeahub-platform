import * as yup from 'yup';

import { Validation } from '@/shared/config/i18n/i18nTranslations';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const passwordRecoverySchema = yup.object().shape({
	password: yup
		.string()
		.required(Validation.PASSWORD_REQUIRED)
		.matches(passwordRules, Validation.PASSWORD_WEAK),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], Validation.PASSWORD_DOES_NOT_MATCH)
		.required(Validation.PASSWORD_REQUIRED),
});
