import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { ResourceTypeCode } from '@/entities/resource';

import { EditResourceFormValues } from '../../model/types/resourcesEditTypes';

export const resourceEditSchema: yup.ObjectSchema<EditResourceFormValues> = yup.object().shape({
	id: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	name: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	type: yup.string<ResourceTypeCode>().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	url: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	iconBase64: yup.string().optional().nullable(),
	specializations: yup
		.array(yup.number().required())
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skills: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
	keywords: yup
		.array(yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
