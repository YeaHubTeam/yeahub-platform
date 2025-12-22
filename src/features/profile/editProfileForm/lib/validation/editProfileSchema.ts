import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { validateNoLinks } from './validateNoLinks';

export const editProfileSchema = yup.object().shape({
	image: yup.string().nullable().optional(),
	username: yup
		.string()
		.required(() => i18n.t(Translation.VALIDATION_REQUIRED))
		.min(2, ({ min }) => i18n.t(Translation.VALIDATION_LENGTH_MIN, { count: min }))
		.max(30, ({ max }) => i18n.t(Translation.VALIDATION_LENGTH_MAX, { count: max })),
	specialization: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	email: yup.string().nullable().email(i18n.t(Translation.VALIDATION_EMAIL)),
	location: yup.string().nullable(),
	skillLevel: yup.string(),
	socialNetworks: yup.array(),
	aboutMe: yup
		.string()
		.nullable()
		.test('no-links', () => i18n.t(Translation.VALIDATION_LINK), validateNoLinks),
	skills: yup.array(yup.number().required()),
});
