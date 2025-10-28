import * as yup from 'yup';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

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
