import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CreateCompanyFormValues } from '../../types/companyCreateTypes';

export const companyCreateSchema: yup.ObjectSchema<CreateCompanyFormValues> = yup.object().shape({
	id: yup.string(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	legalName: yup.string(),
	description: yup.string(),
	imageSrc: yup.string().notRequired(),
	companyImage: yup.string().notRequired(),
	inn: yup.string(),
	kpp: yup.string(),
	createdBy: yup
		.object()
		.shape({
			id: yup.string().required(),
			username: yup.string().required(),
		})
		.optional(),
});
