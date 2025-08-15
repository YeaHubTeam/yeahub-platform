import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CompanyEditFormValues } from '../../types/companyEditPageTypes';

export const companyEditSchema: yup.ObjectSchema<CompanyEditFormValues> = yup.object().shape({
	id: yup.string().required(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	legalName: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	imageSrc: yup.string().nullable().notRequired(),
	companyImage: yup.string().notRequired(),
	inn: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	kpp: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	createdBy: yup
		.object()
		.shape({
			id: yup.string().required(),
			username: yup.string().required(),
		})
		.optional(),
});
