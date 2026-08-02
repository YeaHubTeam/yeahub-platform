import * as yup from 'yup';
import YupPassword from 'yup-password';

import { i18n, Translation } from '@/shared/config';
import { emailRule } from '@/shared/libs';

YupPassword(yup);

export const loginSchema = yup.object().shape({
	username: yup
		.string()
		.trim()
		.matches(emailRule, i18n.t(Translation.VALIDATION_EMAIL))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	password: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
