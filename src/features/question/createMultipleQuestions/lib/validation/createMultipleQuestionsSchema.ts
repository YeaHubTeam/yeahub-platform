import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CreateMultipleQuestionsFormValues } from '../../model/types/createMultipleQuestionsTypes';

export const createMultipleQuestionsSchema: yup.ObjectSchema<CreateMultipleQuestionsFormValues> =
	yup.object().shape({
		specializationId: yup
			.number()
			.nullable()
			.required(i18n.t(Translation.VALIDATION_REQUIRED))
			.typeError(i18n.t(Translation.VALIDATION_REQUIRED)),
		questions: yup
			.array()
			.of(
				yup
					.string()
					.required(i18n.t(Translation.VALIDATION_REQUIRED))
					.trim()
					.min(1, i18n.t(Translation.VALIDATION_REQUIRED)),
			)
			.min(1, i18n.t(Translation.VALIDATION_REQUIRED))
			.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	});
