import { t } from 'i18next';

import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';

import { AgreementForm } from '@/features/subscription';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { FaqList } from '@/widgets/FaqList';

export const FreeSubscriptionTab = () => {
	const { isMobile } = useScreenSize();

	const faqList = [
		{
			id: 1,
			question: t(Subscription.SUBSCRIPTION_FAQ_FIRST_QUESTION),
			answer: t(Subscription.SUBSCRIPTION_FAQ_FIRST_ANSWER),
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
		<>
			<Flex direction="column" gap={isMobile ? '40' : '60'}>
				<AgreementForm />
				<FaqList faqList={faqList} />
			</Flex>
		</>
	);
};
