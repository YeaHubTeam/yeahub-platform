import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { SubscriptionAgreeFormValues } from '../types/subscriptionAgreeTypes';

export const subscriptionAgreeSchema: yup.ObjectSchema<SubscriptionAgreeFormValues> = yup
	.object()
	.shape({
		email: yup
			.string()
			.email(() => i18n.t(Translation.VALIDATION_EMAIL))
			.required(() => i18n.t(Translation.VALIDATION_REQUIRED)),
		isOfferAgreed: yup.boolean().required(() => i18n.t(Translation.VALIDATION_REQUIRED)),
		isConsentAgreed: yup.boolean().required(() => i18n.t(Translation.VALIDATION_REQUIRED)),
	});
