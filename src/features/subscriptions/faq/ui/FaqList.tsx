import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getSubscriptionFaqList } from '../model/constants/faqData';

import { FaqItem } from './FaqItem/FaqItem';

export const FaqList = () => {
	const { t } = useTranslation(i18Namespace.subscription);
	const { isMobile } = useScreenSize();
	const faqList = getSubscriptionFaqList(t);

	return (
		<Card>
			<Flex direction="column" gap="16">
				<Text variant={isMobile ? 'body5-accent' : 'head3'}>
					{t(Subscription.SUBSCRIPTION_FAQ_TITLE)}
				</Text>
				<Flex componentType="ul" direction="column" gap="16">
					{faqList.map((faqItem) => (
						<FaqItem key={faqItem.id} item={faqItem} />
					))}
				</Flex>
			</Flex>
		</Card>
	);
};
