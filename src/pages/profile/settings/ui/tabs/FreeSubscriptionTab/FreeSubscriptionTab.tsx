import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Subscription } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';

import { WithFeature } from '@/entities/featureFlag';
import { subscriptionPrices } from '@/entities/subscription';

import { FaqList } from '@/widgets/FaqList';
import { SubscriptionsList } from '@/widgets/SubscriptionsList';

export const FreeSubscriptionTab = () => {
	const { t } = useTranslation(i18Namespace.subscription);
	const navigate = useNavigate();

	const onMoveMainPage = () => {
		navigate(ROUTES.interview.page);
	};

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
			<WithFeature
				featureId="dashboard.subscription.show-tariffs"
				fallback={
					<Stub
						type="access-denied"
						title={t(Subscription.SUBSCRIPTION_INFO_UNAVAILABLE_TITLE)}
						subtitle={t(Subscription.SUBSCRIPTION_INFO_UNAVAILABLE_DESCRIPTION)}
						onClick={onMoveMainPage}
					/>
				}
			>
				<SubscriptionsList />
			</WithFeature>
			<FaqList faqList={faqList} />
		</Flex>
	);
};
