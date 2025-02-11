import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CollectionEditFormValues } from '@/features/collections/editCollection/model/types/collectionEditTypes';

export const collectionEditSchema: yup.ObjectSchema<CollectionEditFormValues> = yup.object().shape({
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	id: yup.number().required(),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	imageSrc: yup.string().nullable(),
	paidOrFree: yup
		.string()
		.oneOf(['paid', 'free'], i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	specializations: yup
		.array(yup.number().required())
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	keywordsCollection: yup
		.array()
		.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	questions: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
