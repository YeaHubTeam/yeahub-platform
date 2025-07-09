import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import IconCheck from '@/shared/assets/icons/iconCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { SubscriptionCard as SubscriptionCardI18 } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Subscription } from '../../model/types/subscription';
import { PremiumSubscriptionTooltipBody } from '../PremiumSubscriptionTooltipBody/PremiumSubscriptionTooltipBody';

import styles from './SubscriptionCard.module.css';
import { Tooltip } from '@/shared/ui/Tooltip';
import { Icon } from '@/shared/ui/Icon';

interface SubscriptionCardProps {
	subscription: Subscription;
	className?: string;
	renderSubscribeButton: () => React.ReactNode;
}

export const SubscriptionCard = ({
	subscription,
	className,
	renderSubscribeButton,
}: SubscriptionCardProps) => {
	const { t } = useTranslation(i18Namespace.subscriptionCard);
	const { isMobile, isTablet } = useScreenSize();

	const titleVariant = isMobile ? 'body4' : isTablet ? 'body5-accent' : 'body6';
	const actualPrice = subscription.discountedPrice
		? subscription.discountedPrice
		: subscription.price;

	return (
		<Card withOutsideShadow className={classNames(styles['subscription'], className)}>
			<Flex direction="column" gap="14">
				<Flex direction="column" gap="14">
					<Flex gap="8" justify="between" className={styles['subscription-header']}>
						<Flex justify="start">
							{subscription.icon}
							<Text variant={titleVariant} className={styles['subscription-name']}>
								{subscription.name}
							</Text>
						</Flex>
						{subscription.tooltipBody && (
							<Tooltip
								title={subscription.tooltipBody}
								offsetTooltip={0}
								placement="bottom"
								color="violet"
							>
								<Icon icon="info" size={20} color="black-600" />
							</Tooltip>
						)}
					</Flex>
					<Text variant="body2" className={styles['subscription-description']}>
						{subscription.description}
					</Text>
				</Flex>
				<Flex gap="8" align="center" className={styles['subscription-price-container']}>
					<Text variant="body3-accent" className={styles['subscription-price']}>
						{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PRICE, { price: actualPrice })}
					</Text>
					{subscription.discountedPrice && (
						<Text variant="body2" className={styles['crossed-out-price']}>
							{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PRICE, { price: subscription.price })}
						</Text>
					)}
				</Flex>
			</Flex>
			<Flex
				className={styles['advantages-and-button-container']}
				align={isMobile || isTablet ? 'normal' : 'start'}
			>
				<Flex componentType="ul" gap="14" wrap="wrap" className={styles['advantages-list']}>
					{subscription.advantages.map((advantage) => (
						<Flex key={advantage.title} align="center" gap="8" className={styles.advantage}>
							<IconCheck
								className={
									advantage.isActive
										? styles['subscription-check-active']
										: styles['subscription-check-inactive']
								}
							/>
							<Text
								variant="body2"
								className={classNames({ [styles['crossed-out-text']]: !advantage.isActive })}
							>
								{advantage.title}
							</Text>
						</Flex>
					))}
				</Flex>
				{subscription.hasSubscribeButton && renderSubscribeButton()}
			</Flex>
		</Card>
	);
};
