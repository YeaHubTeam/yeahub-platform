import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';
import { passwordRules } from '@/shared/libs';

export const passwordRecoverySchema = yup.object().shape({
	password: yup
		.string()
		.min(8, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
		.matches(passwordRules, () => i18n.t(Translation.VALIDATION_PASSWORD_WEAK))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	confirmPassword: yup
		.string()
		.min(8, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
		.matches(passwordRules, () => i18n.t(Translation.VALIDATION_PASSWORD_WEAK))
		.oneOf([yup.ref('password')], () => i18n.t(Translation.VALIDATION_PASSWORD_SIMILAR))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
