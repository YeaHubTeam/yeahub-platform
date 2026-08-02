import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';
import { emailRule } from '@/shared/libs';

import { SubscriptionAgreeFormValues } from '../types/subscriptionAgreeTypes';

export const subscriptionAgreeSchema: yup.ObjectSchema<SubscriptionAgreeFormValues> = yup
	.object()
	.shape({
		email: yup
			.string()
			.matches(emailRule, i18n.t(Translation.VALIDATION_EMAIL))
			.required(() => i18n.t(Translation.VALIDATION_REQUIRED)),
		isOfferAgreed: yup
			.boolean()
			.oneOf([true], () => i18n.t(Translation.VALIDATION_REQUIRED))
			.required(() => i18n.t(Translation.VALIDATION_REQUIRED)),

		isConsentAgreed: yup
			.boolean()
			.oneOf([true], () => i18n.t(Translation.VALIDATION_REQUIRED))
			.required(() => i18n.t(Translation.VALIDATION_REQUIRED)),
	});
