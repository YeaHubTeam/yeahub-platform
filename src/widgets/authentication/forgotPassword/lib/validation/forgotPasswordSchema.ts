import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

export const forgotPasswordSchema = yup.object().shape({
	username: yup
		.string()
		.email(i18n.t(Translation.VALIDATION_EMAIL))
		.test('has-domain-zone', i18n.t(Translation.VALIDATION_EMAIL), (value) => {
			if (!value) return true;
			const parts = value.split('@');
			if (parts.length !== 2) return false;
			const domain = parts[1];
			return domain.includes('.') && !domain.endsWith('.');
		})
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
