import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CompanyEditFormValues } from '../../model/types/companyEditPageTypes';

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
