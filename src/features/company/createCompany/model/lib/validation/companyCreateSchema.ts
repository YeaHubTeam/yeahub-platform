import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CreateCompanyFormValues } from '@/features/company/createCompany/model/types/companyCreateTypes';

export const companyCreateSchema: yup.ObjectSchema<CreateCompanyFormValues> = yup.object().shape({
	title: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	imageSrc: yup.string(),
	companyImage: yup.string(),
});
