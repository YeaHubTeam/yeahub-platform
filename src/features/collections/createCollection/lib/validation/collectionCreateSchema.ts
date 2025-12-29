import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CollectionCreateFormValues } from '../../model/types/collectionCreateTypes';

export const collectionCreateSchema: yup.ObjectSchema<CollectionCreateFormValues> = yup
	.object()
	.shape({
		title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		imageSrc: yup.string().nullable(),
		collectionImage: yup.string(),
		isFree: yup.boolean().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		specializations: yup
			.array(yup.number().required())
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),
		companyId: yup.string().required().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		keywords: yup
			.array()
			.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
			.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),
		questions: yup
			.array(yup.number().required())
			.required(i18n.t(Translation.VALIDATION_PARAMETER)),
	});
