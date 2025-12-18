import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CreateSkillFormValues } from '../../model/types/skillCreateTypes';

export const skillCreateSchema: yup.ObjectSchema<CreateSkillFormValues> = yup.object().shape({
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	imageSrc: yup.string(),
	skillImage: yup.string(),
	specializations: yup.array().of(yup.number().required()).optional(),
});
