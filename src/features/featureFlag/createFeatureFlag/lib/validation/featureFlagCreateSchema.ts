import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { clientTypes, FEATURE_FLAG_DESCRIPTION_LIMIT } from '@/entities/featureFlag';

import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';

const FLAG_MIN = 3;
const FLAG_MAX = 50;

export const featureFlagCreateSchema: yup.ObjectSchema<CreateFeatureFlagFormValues> = yup
	.object()
	.shape({
		flag: yup
			.string()
			.required(i18n.t(Translation.VALIDATION_REQUIRED))
			.min(FLAG_MIN, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
			.max(FLAG_MAX, ({ max }) => i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: max }))
			.matches(/^\S*$/, i18n.t(Translation.VALIDATION_NO_SPACE))
			.matches(/^[^A-Z]*$/, i18n.t(Translation.VALIDATION_NO_UPPERCASE))
			.matches(/^[a-z.-]*$/, i18n.t(Translation.VALIDATION_LATIN_CHARACTERS_AND_SYMBOLS)),
		description: yup
			.string()
			.required(i18n.t(Translation.VALIDATION_REQUIRED))
			.max(FEATURE_FLAG_DESCRIPTION_LIMIT, ({ max }) =>
				i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: max }),
			),
		roleIds: yup.array().of(yup.number().defined()).defined(),
		clientType: yup.mixed<(typeof clientTypes)[number]>().oneOf(clientTypes).required(),
		enabled: yup.boolean().required(),
	});
