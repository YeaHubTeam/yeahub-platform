import { useTranslation } from 'react-i18next';

import { i18Namespace, Subscription } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetSubscriptionsInfo } from '../../libs/hooks/useGetSubscriptionsInfo';
import { SubscriptionCard } from '../SubscriptionCard/SubscriptionCard';
import { SubscriptionsBanner } from '../SubscriptionsBanner/SubscriptionsBanner';

import styles from './SubscriptionsList.module.css';

export const SubscriptionsList = () => {
	const { t } = useTranslation(i18Namespace.subscription);
	const { isMobile } = useScreenSize();

	const subscriptions = useGetSubscriptionsInfo();

	return (
		<Card withOutsideShadow>
			<Flex direction="column" gap="20">
				<Flex direction="column" gap={isMobile ? '8' : '12'}>
					<Text variant={isMobile ? 'body5-accent' : 'head3'}>{t(Subscription.TITLE)}</Text>
					<Text className={styles.subtitle} variant={isMobile ? 'body2' : 'body3'}>
						{t(Subscription.DESCRIPTION)}
					</Text>
				</Flex>
				<Flex gap="20" wrap="wrap" className={styles.list}>
					{subscriptions.map((subscription) => (
						<SubscriptionCard key={subscription.id} subscription={subscription} />
					))}
				</Flex>
				<SubscriptionsBanner />
			</Flex>
		</Card>
	);
};
