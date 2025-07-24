import { Subscription } from '@/shared/config/i18n/i18nTranslations';

import { subscriptionPrices } from '@/entities/subscription';

type TranslationFunction = (key: string, options?: Record<string, unknown>) => string;

export const getSubscriptionFaqList = (t: TranslationFunction) => [
	{
		id: 1,
		question: t(Subscription.SUBSCRIPTION_FAQ_FIRST_QUESTION),
		answer: t(Subscription.SUBSCRIPTION_FAQ_FIRST_ANSWER, {
			price: subscriptionPrices.discountPrice,
		}),
	},
	{
		id: 2,
		question: t(Subscription.SUBSCRIPTION_FAQ_SECOND_QUESTION),
		answer: t(Subscription.SUBSCRIPTION_FAQ_SECOND_ANSWER),
	},
	{
		id: 3,
		question: t(Subscription.SUBSCRIPTION_FAQ_THIRD_QUESTION),
		answer: t(Subscription.SUBSCRIPTION_FAQ_THIRD_ANSWER),
	},
	{
		id: 4,
		question: t(Subscription.SUBSCRIPTION_FAQ_FOURTH_QUESTION),
		answer: t(Subscription.SUBSCRIPTION_FAQ_FOURTH_ANSWER),
	},
];
