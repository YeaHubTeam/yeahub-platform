import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CollectionCreateFormValues } from '../../types/collectionCreateTypes';

export const collectionCreateSchema: yup.ObjectSchema<CollectionCreateFormValues> = yup
	.object()
	.shape({
		title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		imageSrc: yup.string().nullable(),
		isFree: yup.boolean().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		specializations: yup
			.array(yup.number().required())
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),
		keywords: yup
			.array()
			.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
			.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),
		questions: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
	});
