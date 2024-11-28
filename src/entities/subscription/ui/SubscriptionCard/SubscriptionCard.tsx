import { useTranslation } from 'react-i18next';

import IconCheck from '@/shared/assets/icons/iconCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { SubscriptionCard as SubscriptionCardI18 } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { SubscribeButton } from '@/features/subscription/SubscribeButton/ui/SubscribeButton';

import { Subscription } from '../../model/types/subscription';

import styles from './SubscriptionCard.module.css';

interface SubscriptionCardProps {
	subscription: Subscription;
}

export const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
	const { t } = useTranslation(i18Namespace.subscriptionCard);

	return (
		<div className={styles['subscription']}>
			<Flex gap="8" className={styles['subscription-header']}>
				<subscription.icon style={{ width: '39px', height: '39px' }} />
				<p className={styles['subscription-name']}>{subscription.name}</p>
			</Flex>
			<p className={styles['subscription-description']}>{subscription.description}</p>
			<p className={styles['subscription-price']}>
				{subscription.price === 0
					? t(SubscriptionCardI18.SUBSCRIPTION_CARD_FREE)
					: t(SubscriptionCardI18.SUBSCRIPTION_CARD_PRICE, { price: subscription.price })}
			</p>
			<SubscribeButton className={styles['subscription-button']} />
			<Flex componentType="ul" direction="column" gap="14">
				{subscription.advantages.map((advantage) => (
					<Flex key={advantage} align="center" gap="8">
						<IconCheck className={styles['subscription-check']} />
						{advantage}
					</Flex>
				))}
			</Flex>
		</div>
	);
};
