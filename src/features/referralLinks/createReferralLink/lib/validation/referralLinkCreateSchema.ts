import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CreateRefferalLinkFormValues } from '../../model/types/refferalLinkCreateTypes';

export const referralLinkCreateSchema: yup.ObjectSchema<CreateRefferalLinkFormValues> = yup
	.object()
	.shape({
		refCode: yup
			.string()
			.trim()
			.required(i18n.t(Translation.VALIDATION_REQUIRED))
			.min(3, i18n.t(Translation.VALIDATION_MIN_VALUE, { min: 3 }))
			.max(50, i18n.t(Translation.VALIDATION_MAX_VALUE, { max: 50 }))
			.matches(
				/^[A-Z0-9]+$/,
				i18n.t('validation.refCode.pattern', {
					defaultValue: 'Только заглавные латинские буквы и цифры',
				}),
			)
			.test('no-spaces', i18n.t(Translation.VALIDATION_NO_SPACE), (value) => !value?.includes(' ')),
		url: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		ownerId: yup
			.string()
			.trim()
			.required(i18n.t(Translation.VALIDATION_REQUIRED))
			.test(
				'owner-required',
				i18n.t('validation.ownerId.required', { defaultValue: 'Выберите владельца' }),

				function (value) {
					const { isOwner } = this.parent;
					if (isOwner) return true;
					return !!value && value.length > 0;
				},
			),
	});
