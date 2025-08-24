import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CompanyEditFormValues } from '../../types/companyEditPageTypes';

export const companyEditSchema: yup.ObjectSchema<CompanyEditFormValues> = yup.object().shape({
	id: yup.string().required(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	legalName: yup.string().nullable().optional(),
	description: yup.string().nullable().optional(),
	imageSrc: yup.string().nullable().optional(),
	companyImage: yup.string().nullable().optional(),
	inn: yup.string().nullable().optional(),
	kpp: yup.string().nullable().optional(),
});
