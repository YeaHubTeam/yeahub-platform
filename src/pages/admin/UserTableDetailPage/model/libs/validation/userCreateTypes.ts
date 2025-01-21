import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { UserStatus } from '@/entities/user';

import { CreateUserFormValues } from '../../types/userCreateTypes';

export const userCreateSchema: yup.ObjectSchema<CreateUserFormValues> = yup.object().shape({
	firstName: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	lastName: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	phone: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	email: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	country: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	city: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	address: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	birthday: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	userRoles: yup
		.array()
		.of(yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	status: yup.string<UserStatus>().required(i18n.t(Translation.VALIDATION_REQUIRED)),
});
