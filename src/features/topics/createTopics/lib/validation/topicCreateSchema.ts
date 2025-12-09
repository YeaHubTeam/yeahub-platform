import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CreateTopicFormValues } from '../../model/types/topicCreateTypes';

export const topicCreateSchema: yup.ObjectSchema<CreateTopicFormValues> = yup.object().shape({
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skillId: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
