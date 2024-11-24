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
		.min(2, i18n.t(Translation.VALIDATION_FIRSTNAME_MIN, { count: 2 }))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	lastName: yup
		.string()
		.trim()
		.min(2, i18n.t(Translation.VALIDATION_LASTNAME_MIN, { count: 2 }))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	email: yup
		.string()
		.email(i18n.t(Translation.VALIDATION_EMAIL_FORMAT))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	password: yup
		.string()
		.min(8, i18n.t(Translation.VALIDATION_PASSWORD_MIN, { count: 8 }))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], i18n.t(Translation.VALIDATION_PASSWORD_CONFIRMATION))
		.matches(passwordRules, {
			message: 'Пароль должен содержать заглавные и строчные буквы, цифры и специальные символы',
		})
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	isChecked: yup
		.boolean()
		.oneOf([true], i18n.t(Translation.VALIDATION_CHECKBOX_ONEOF))
		.required(i18n.t(Translation.VALIDATION_CHECKBOX_REQUIRED)),
});
