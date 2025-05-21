import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CreateSpecializationFormValues } from '../../types/specializationCreateTypes';

export const specializationCreateSchema: yup.ObjectSchema<CreateSpecializationFormValues> = yup
	.object()
	.shape({
		title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		imageSrc: yup.string(),
	});
