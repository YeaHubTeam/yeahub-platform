import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { ResourceAccessCategory } from '@/entities/resource';

import { CreateResourceFormValues } from '../../types/resourceCreateTypes';

export const resourceCreateSchema: yup.ObjectSchema<CreateResourceFormValues> = yup.object().shape({
	name: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	provider: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	iconBase64: yup.string().defined(),
	types: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
	specializations: yup
		.array(yup.number().required())
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skills: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
	keywords: yup
		.array()
		.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	accessCategory: yup
		.mixed<ResourceAccessCategory>()
		.oneOf(['free', 'has_trial', 'payed_only'])
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	isActive: yup.boolean().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
