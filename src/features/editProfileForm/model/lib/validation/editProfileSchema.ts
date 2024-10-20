import * as yup from 'yup';

import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Validation } from '@/shared/config/i18n/i18nTranslations';

export const editProfileSchema = yup.object().shape({
	image: yup
		.mixed<FileList>()
		.optional()
		.test(
			'fileSize',
			i18n.t(Validation.IMAGE_FILE_SIZE, { ns: i18Namespace.validation }),
			(value) => {
				if (value && value.length > 0) {
					return value[0].size <= 2000000; // 2MB
				}
				return true;
			},
		)
		.test(
			'fileType',
			i18n.t(Validation.IMAGE_FILE_TYPE, { ns: i18Namespace.validation }),
			(value) => {
				if (value && value.length > 0) {
					return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
				}
				return true;
			},
		),
	firstName: yup
		.string()
		.required(i18n.t(Validation.FIRST_NAME_REQUIRED, { ns: i18Namespace.validation }))
		.min(2, i18n.t(Validation.FIRST_NAME_MIN, { count: 2, ns: i18Namespace.validation }))
		.max(30, i18n.t(Validation.FIRST_NAME_MAX, { count: 30, ns: i18Namespace.validation })),
	lastName: yup
		.string()
		.required(i18n.t(Validation.LAST_NAME_REQUIRED, { ns: i18Namespace.validation }))
		.min(2, i18n.t(Validation.LAST_NAME_MIN, { count: 2, ns: i18Namespace.validation }))
		.max(30, i18n.t(Validation.LAST_NAME_MAX, { count: 30, ns: i18Namespace.validation })),
	specialization: yup
		.number()
		.required(i18n.t(Validation.SPECIALIZATION_REQUIRED, { ns: i18Namespace.validation })),
	phone: yup
		.string()
		.required(i18n.t(Validation.REQUIRED, { ns: i18Namespace.validation }))
		.matches(
			/^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
			i18n.t(Validation.PHONE, { ns: i18Namespace.validation }),
		),
	email: yup
		.string()
		.email(i18n.t(Validation.EMAIL, { ns: i18Namespace.validation }))
		.required(i18n.t(Validation.EMAIL_REQUIRED, { ns: i18Namespace.validation })),
	location: yup.string().nullable(),
	skillLevel: yup.string(),
	socialNetworks: yup.array(),
	aboutMe: yup.string().nullable(),
	skills: yup.array(yup.number().required()),
});
