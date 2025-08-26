import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import type { ResourceAccessCategory } from '@/entities/resource';

import type { ResourceEditFormValues } from '../../types/resourcesEditTypes';

const urlEmptyOrValid = yup
	.string()
	.trim()
	.defined()
	.test({
		name: 'url-empty-or-valid',
		message: i18n.t(Translation.VALIDATION_LINK, { defaultValue: 'Invalid URL' }),
		test(value) {
			if (!value) return true;
			try {
				new URL(value);
				return true;
			} catch {
				return false;
			}
		},
	});

const _schema = yup.object({
	id: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	name: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	provider: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	iconBase64: yup.string().defined(),
	url: urlEmptyOrValid,
	specializations: yup
		.array(yup.number().required())
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	skills: yup.array(yup.number().required()).required(i18n.t(Translation.VALIDATION_REQUIRED)),
	keywords: yup
		.array(yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)))
		.min(1, () => i18n.t(Translation.VALIDATION_REQUIRED))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	accessCategory: yup
		.mixed<ResourceAccessCategory>()
		.oneOf(['free', 'has_trial', 'payed_only'])
		.notRequired(),
	isActive: yup.boolean().notRequired(),
});

export const resourceEditSchema = _schema as yup.ObjectSchema<ResourceEditFormValues>;
