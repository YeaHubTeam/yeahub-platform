import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { QuestionStatus } from '@/entities/question';

import { EditQuestionFormValues } from '../../model/types/questionEditPageTypes';

export const questionEditSchema: yup.ObjectSchema<EditQuestionFormValues> = yup.object().shape({
	id: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	shortAnswer: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	longAnswer: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	imageSrc: yup.string().nullable(),
	code: yup.string().nullable(),
	rate: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required(),
	complexity: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required(),
	specializations: yup.array(yup.number().required()).required(),
	skills: yup.array(yup.number().required()).required(),
	keywords: yup
		.array()
		.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	status: yup.string<QuestionStatus>().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
