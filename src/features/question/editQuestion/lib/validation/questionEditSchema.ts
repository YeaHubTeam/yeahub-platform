import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';
import { isEmptyHtml } from '@/shared/libs';

import { QuestionStatus } from '@/entities/question';

import { EditQuestionFormValues } from '../../model/types/questionEditPageTypes';

export const questionEditSchema: yup.ObjectSchema<EditQuestionFormValues> = yup.object().shape({
	id: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	title: yup
		.string()
		.required(i18n.t(Translation.VALIDATION_REQUIRED))
		.trim()
		.test(
			'is-not-empty',
			i18n.t(Translation.VALIDATION_REQUIRED),
			(value) => value !== undefined && value.trim().length > 0,
		)
		.max(255, i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: 255 })),
	description: yup
		.string()
		.required(i18n.t(Translation.VALIDATION_REQUIRED))
		.trim()
		.test(
			'is-not-empty',
			i18n.t(Translation.VALIDATION_REQUIRED),
			(value) => value !== undefined && value.trim().length > 0,
		)
		.max(1000, i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: 1000 })),
	shortAnswer: yup
		.string()
		.required(i18n.t(Translation.VALIDATION_REQUIRED))
		.test('is-not-empty', i18n.t(Translation.VALIDATION_REQUIRED), (value) => !isEmptyHtml(value))
		.max(5000, i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: 5000 })),
	longAnswer: yup
		.string()
		.required(i18n.t(Translation.VALIDATION_REQUIRED))
		.test('is-not-empty', i18n.t(Translation.VALIDATION_REQUIRED), (value) => !isEmptyHtml(value))
		.max(10000, i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: 10000 })),
	imageSrc: yup.string().nullable(),
	code: yup.string().nullable(),
	rate: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required()
		.min(1, i18n.t(Translation.VALIDATION_MIN_VALUE, { min: 1 }))
		.max(5, i18n.t(Translation.VALIDATION_MAX_VALUE, { max: 5 })),
	complexity: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required()
		.min(1, i18n.t(Translation.VALIDATION_MIN_VALUE, { min: 1 }))
		.max(10, i18n.t(Translation.VALIDATION_MAX_VALUE, { max: 10 })),
	specializations: yup
		.array(yup.number().required())
		.min(1, i18n.t(Translation.VALIDATION_MIN_ARRAY, { min: 1 }))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skills: yup
		.array(yup.number().required())
		.min(1, i18n.t(Translation.VALIDATION_MIN_ARRAY, { min: 1 }))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	keywords: yup
		.array()
		.of(yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	status: yup.string<QuestionStatus>().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
