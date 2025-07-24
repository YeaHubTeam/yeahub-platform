import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { AgreementForm } from '@/features/subscriptions/subscribe';

import { getSubscriptionFaqList } from '../../model/constants/faqData';

export const FreeSubscription = () => {
	const { t } = useTranslation(i18Namespace.subscription);
	const faqList = getSubscriptionFaqList(t);

	return (
		<Flex direction="column" gap="20">
			<Card>
				<AgreementForm />
			</Card>
			<Card>
				<Flex direction="column" gap="24">
					<Text variant="head3">{t(Subscription.SUBSCRIPTION_FAQ_TITLE)}</Text>
					<Flex direction="column" gap="12">
						{faqList.map((faqItem) => (
							<div key={faqItem.id}>
								<Text variant="body3-strong">{faqItem.question}</Text>
								<Text variant="body3">{faqItem.answer}</Text>
							</div>
						))}
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
