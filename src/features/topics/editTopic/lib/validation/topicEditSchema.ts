import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { EditTopicFormValues } from '../../model/types/topicEditTypes';

export const topicEditSchema: yup.ObjectSchema<EditTopicFormValues> = yup.object().shape({
	id: yup.number().required(),
	title: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skillId: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
