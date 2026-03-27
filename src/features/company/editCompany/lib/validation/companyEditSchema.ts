import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { CompanyEditFormValues } from '../../model/types/companyEditPageTypes';

export const companyEditSchema: yup.ObjectSchema<CompanyEditFormValues> = yup.object().shape({
	id: yup.string().required(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	legalName: yup.string().optional(),
	description: yup.string().optional(),
	imageSrc: yup.string().optional(),
	companyImage: yup.string().nullable().optional(),
	inn: yup.string().optional(),
	kpp: yup.string().optional(),
});
