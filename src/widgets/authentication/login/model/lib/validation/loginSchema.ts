import * as yup from 'yup';
import YupPassword from 'yup-password';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
YupPassword(yup);

export const loginSchema = yup.object().shape({
	username: yup
		.string()
		.trim()
		.email(i18n.t(Translation.VALIDATION_EMAIL))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	password: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
