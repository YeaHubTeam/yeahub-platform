import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Validation } from '@/shared/config/i18n/i18nTranslations';

export const forgotPasswordSchema = yup.object().shape({
	username: yup
		.string()
		.email(i18n.t(Validation.EMAIL_INVALID))
		.required(i18n.t(Validation.EMAIL_REQUIRED)),
});
