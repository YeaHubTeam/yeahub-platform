import * as yup from 'yup';
import YupPassword from 'yup-password';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { passwordRules } from '@/shared/constants/regexp';

YupPassword(yup);

export const changePasswordSchema = yup.object().shape({
	password: yup
		.string()
		.min(8, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
		.matches(passwordRules, () => i18n.t(Translation.VALIDATION_PASSWORD_WEAK))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password')], () => i18n.t(Translation.VALIDATION_PASSWORD_SIMILAR))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
