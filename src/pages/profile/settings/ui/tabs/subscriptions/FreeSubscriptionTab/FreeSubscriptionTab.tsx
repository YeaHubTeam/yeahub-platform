import { useTranslation } from 'react-i18next';

import { i18Namespace, Subscription } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { subscriptionPrices } from '@/entities/subscription';

import { FaqList } from '../FaqList/FaqList';
import { SubscriptionsList } from '../SubscriptionsList/SubscriptionsList';

export const FreeSubscriptionTab = () => {
	const { t } = useTranslation(i18Namespace.subscription);

	const faqList = [
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

	return (
		<Flex direction="column" gap="20">
			<SubscriptionsList />
			<FaqList faqList={faqList} />
		</Flex>
	);
};
