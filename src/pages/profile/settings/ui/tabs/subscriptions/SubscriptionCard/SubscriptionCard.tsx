import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { SubscriptionInfo } from '../../../../model/types/subscription';
import { SubscriptionBenefit } from '../SubscriptionBenefit/SubscriptionBenefit';

import styles from './SubscriptionCard.module.css';

interface SubscriptionCardProps {
	subscription: SubscriptionInfo;
}

export const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
	return (
		<Flex direction="column" flex={1}>
			<Flex
				className={styles.badge}
				justify="center"
				style={{
					backgroundColor: `var(--color-${subscription.badge ? subscription.color : 'white-900'})`,
				}}
			>
				<Text variant="body3-accent" color="white-900">
					{subscription.badge}
				</Text>
			</Flex>
			<Card withOutsideShadow className={styles.card} classNameContent={styles['card-content']}>
				<Flex direction="column" justify="between" gap="20" className={styles.content}>
					<Flex direction="column" gap="14">
						<Flex gap="10" align="center">
							<Icon icon="sealCheck" size={40} color={subscription.color} />
							<Text variant="body6">{subscription.title}</Text>
						</Flex>
						<Text variant="body2">{subscription.subtitle}</Text>
						<Flex direction="column" gap="4">
							<Flex align="center" gap="10">
								<Text variant="body5-strong" color="purple-900">
									{subscription.finalPrice}
								</Text>
								{subscription.fullPrice && (
									<Text variant="body3-accent" color="black-500" className={styles['full-price']}>
										{subscription.fullPrice}
									</Text>
								)}
							</Flex>
							{subscription.pricePerMonth && (
								<Text variant="body3-accent" color="purple-900">
									{subscription.pricePerMonth}
								</Text>
							)}
						</Flex>
					</Flex>
					<Flex direction="column" gap="24">
						{subscription.action}
						<Flex direction="column" gap="14">
							{subscription.benefits.map((benefit) => (
								<SubscriptionBenefit key={benefit.title} benefit={benefit} />
							))}
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
