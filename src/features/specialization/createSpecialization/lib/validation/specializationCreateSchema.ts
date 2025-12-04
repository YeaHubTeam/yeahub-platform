import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CreateSpecializationFormValues } from '../../model/types/specializationCreateTypes';

export const specializationCreateSchema: yup.ObjectSchema<CreateSpecializationFormValues> = yup
	.object()
	.shape({
		title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		imageSrc: yup.string(),
	});
