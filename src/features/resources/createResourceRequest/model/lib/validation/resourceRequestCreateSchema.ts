import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { ResourceTypeCode } from '@/entities/resource';

import { CreateResourceRequestFormValues } from '../../types/resourceRequestCreateTypes';

export const resourceRequestCreateSchema: yup.ObjectSchema<CreateResourceRequestFormValues> = yup
	.object()
	.shape({
		name: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		type: yup.string<ResourceTypeCode>().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		url: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		iconBase64: yup.string().defined(),
		specializations: yup
			.array(yup.number().required())
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),
		skills: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
		keywords: yup
			.array()
			.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
			.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	});
