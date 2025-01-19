import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { EditSkillFormValues } from '../../types/skillEditPageTypes';

export const skillEditSchema: yup.ObjectSchema<EditSkillFormValues> = yup.object().shape({
	id: yup.number().required(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	imageSrc: yup.string().notRequired(),
	skillImage: yup.string(),
	specializations: yup.array().of(yup.number().required()).optional(),
});
