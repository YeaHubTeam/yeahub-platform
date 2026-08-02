import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';
import { emailRule } from '@/shared/libs';

export const forgotPasswordSchema = yup.object().shape({
	username: yup
		.string()
		.matches(emailRule, i18n.t(Translation.VALIDATION_EMAIL))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
