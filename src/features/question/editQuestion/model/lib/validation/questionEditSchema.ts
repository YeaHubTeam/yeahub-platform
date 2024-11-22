import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

export const questionEditSchema = yup.object().shape({
	id: yup.number().required(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	shortAnswer: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	longAnswer: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	rate: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required(),
	specializations: yup.array().required(),
	keywords: yup
		.array()
		.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
