import * as yup from 'yup';
import YupPassword from 'yup-password';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
YupPassword(yup);

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const changePasswordSchema = yup.object().shape({
	newPassword: yup
		.string()
		.min(8, i18n.t(Translation.VALIDATION_PASSWORD_MIN, { count: 8 }))
		.matches(passwordRules, {
			message: i18n.t(
				'Пароль должен содержать заглавные и строчные буквы, цифры и специальные символы',
			),
		})
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], i18n.t(Translation.VALIDATION_PASSWORD_CONFIRMATION))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
