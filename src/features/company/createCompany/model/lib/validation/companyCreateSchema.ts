import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CreateCompanyFormValues } from '../../types/companyCreateTypes';

export const companyCreateSchema: yup.ObjectSchema<CreateCompanyFormValues> = yup.object().shape({
	id: yup.string(),
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	legalName: yup.string().optional(),
	description: yup.string().optional(),
	imageSrc: yup.string().nullable().optional(),
	companyImage: yup.string().nullable().optional(),
	inn: yup.string().optional(),
	kpp: yup.string().optional(),
	createdBy: yup.mixed().strip(true).optional(),
});
