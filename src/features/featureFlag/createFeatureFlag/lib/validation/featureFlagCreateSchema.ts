import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { ClientType } from '@/entities/featureFlag';

import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';

const onlyLatin = /^[A-Za-z]+$/;

export const featureFlagCreateSchema: yup.ObjectSchema<CreateFeatureFlagFormValues> = yup
	.object()
	.shape({
		flag: yup
			.string()
			.trim()
			.required(i18n.t(Translation.VALIDATION_REQUIRED))
			.min(3, i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: 3 }))
			.max(50, i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: 50 }))
			.matches(onlyLatin, i18n.t(Translation.VALIDATION_LATIN_AND_NUMBER))
			.test('no-spaces', i18n.t(Translation.VALIDATION_NO_SPACE), (value) => !value?.includes(' ')),

		description: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),

		roleIds: yup.array().of(yup.number().required()).required(),

		clientType: yup
			.mixed<ClientType>()
			.oneOf(['WEB', 'MOBILE', 'DESKTOP'])
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),

		enabled: yup.boolean().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	});
