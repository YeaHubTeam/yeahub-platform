import { TFunction } from 'i18next';
import * as yup from 'yup';
import YupPassword from 'yup-password';

import { Translation } from '@/shared/config';
import { passwordRules } from '@/shared/libs';

YupPassword(yup);

export const createChangePasswordSchema = (t: TFunction) =>
	yup.object().shape({
		password: yup
			.string()
			.min(8, ({ min }) => t(Translation.VALIDATION_LENGTH_MIN, { count: min, ns: 'translation' }))
			.matches(passwordRules, () => t(Translation.VALIDATION_PASSWORD_WEAK, { ns: 'translation' }))
			.required(t(Translation.VALIDATION_REQUIRED, { ns: 'translation' })),
		passwordConfirm: yup
			.string()
			.min(8, ({ min }) => t(Translation.VALIDATION_LENGTH_MIN, { count: min, ns: 'translation' }))
			.matches(passwordRules, () => t(Translation.VALIDATION_PASSWORD_WEAK, { ns: 'translation' }))
			.oneOf([yup.ref('password')], () =>
				t(Translation.VALIDATION_PASSWORD_SIMILAR, { ns: 'translation' }),
			)
			.required(t(Translation.VALIDATION_REQUIRED, { ns: 'translation' })),
	});
