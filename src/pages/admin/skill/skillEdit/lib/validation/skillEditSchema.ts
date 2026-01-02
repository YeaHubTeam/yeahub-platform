import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { EditSkillFormValues } from '../../model/types/skillEditPageTypes';

export const skillEditSchema: yup.ObjectSchema<EditSkillFormValues> = yup.object().shape({
	id: yup.number().required(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	imageSrc: yup.string().notRequired(),
	skillImage: yup.string(),
	specializations: yup.array().of(yup.number().required()).optional(),
});
