import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CreateTopicFormValues } from '../../types/topicCreateTypes';

export const topicCreateSchema: yup.ObjectSchema<CreateTopicFormValues> = yup.object().shape({
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skillId: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
