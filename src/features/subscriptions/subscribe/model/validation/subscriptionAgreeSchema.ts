import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { SubscriptionAgreeFormValues } from '../types/subscriptionAgreeTypes';

export const subscriptionAgreeSchema: yup.ObjectSchema<SubscriptionAgreeFormValues> = yup
	.object()
	.shape({
		email: yup
			.string()
			.matches(
				/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				i18n.t(Translation.VALIDATION_EMAIL),
			)
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
