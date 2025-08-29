import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { EditResourceFormValues } from '../../types/resourcesEditTypes';

export const resourceEditSchema: yup.ObjectSchema<EditResourceFormValues> = yup.object().shape({
	id: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	name: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	type: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	url: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	iconBase64: yup.string().optional(),
	specializations: yup
		.array(yup.number().required())
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skills: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
	keywords: yup
		.array(yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
