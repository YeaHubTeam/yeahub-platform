import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { EditSpecializationFormValues } from '../../types/specializationEditPageTypes';

export const specializationEditSchema: yup.ObjectSchema<EditSpecializationFormValues> = yup
	.object()
	.shape({
		id: yup.number().required(),
		title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
		imageSrc: yup.string().nullable(),
		createdAt: yup.string().required(),
		updatedAt: yup.string().required(),
	});
