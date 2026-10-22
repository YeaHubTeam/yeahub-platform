import * as yup from 'yup';

import { i18Namespace, i18n, Translation } from '@/shared/config';
import { isEmptyHtml } from '@/shared/libs';

import {
	type ArticleTopics,
	type ArticleFormat,
	type ArticleContentType,
} from '@/entities/article';

import { CreateArticleFormValues } from '../../model/types/articleCreateTypes';

const requiredMessage = () =>
	i18n.t(Translation.VALIDATION_REQUIRED, { ns: i18Namespace.translation });
const maxLengthMessage = (count: number) => () =>
	i18n.t(Translation.VALIDATION_LENGTH_MAX, { count, ns: i18Namespace.translation });
const minArrayMessage = (min: number) => () =>
	i18n.t(Translation.VALIDATION_MIN_ARRAY, { min, ns: i18Namespace.translation });

export const articleCreateSchema: yup.ObjectSchema<CreateArticleFormValues> = yup
	.object({
		title: yup.string().trim().required(requiredMessage),
		bodyHtml: yup
			.string()
			.required(requiredMessage)
			.test('is-not-empty', requiredMessage, (value) => !isEmptyHtml(value)),
		slug: yup
			.string()
			.trim()
			.transform((value) => (value === '' ? undefined : value))
			.optional(),
		format: yup
			.mixed<ArticleFormat>()
			.oneOf(['guide', 'breakdown', 'qa', 'interview_prep'])
			.optional(),
		metaTitle: yup
			.string()
			.trim()
			.transform((value) => (value === '' ? undefined : value))
			.max(255, maxLengthMessage(255))
			.optional(),
		metaDescription: yup
			.string()
			.trim()
			.transform((value) => (value === '' ? undefined : value))
			.max(512, maxLengthMessage(512))
			.optional(),
		ogTitle: yup
			.string()
			.trim()
			.transform((value) => (value === '' ? undefined : value))
			.max(255, maxLengthMessage(255))
			.optional(),
		ogDescription: yup
			.string()
			.trim()
			.transform((value) => (value === '' ? undefined : value))
			.max(512, maxLengthMessage(512))
			.optional(),
		topics: yup
			.array()
			.of(
				yup
					.mixed<ArticleTopics>()
					.oneOf(['interview', 'system_design', 'basics', 'advanced'])
					.defined(),
			)
			.transform((value) => (value.length === 0 ? undefined : value))
			.optional(),
		contentType: yup
			.mixed<ArticleContentType>()
			.oneOf(['theory', 'practice', 'interview', 'roadmap', 'case_study'])
			.optional(),
		specializations: yup
			.array(yup.number().required(requiredMessage))
			.min(1, minArrayMessage(1))
			.required(requiredMessage),
		skills: yup
			.array(yup.number().required(requiredMessage))
			.min(1, minArrayMessage(1))
			.required(requiredMessage),
	})
	.required();
