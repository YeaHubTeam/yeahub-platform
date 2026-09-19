import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { SubscriptionBenefitSkeleton } from '../SubscriptionBenefit/SubscriptionBenefit.skeleton';

import styles from './SubscriptionCard.module.css';

export const SubscriptionCardSkeleton = () => {
	return (
		<Flex direction="column" flex={1}>
			<Flex className={styles.badge} justify="center">
				<TextSkeleton variant="body3-accent" width={100} />
			</Flex>
			<CardSkeleton
				withOutsideShadow
				className={styles.card}
				classNameContent={styles['card-content']}
			>
				<Flex direction="column" justify="between" gap="20" className={styles.content}>
					<Flex direction="column" gap="14">
						<Flex gap="10" align="center">
							<IconSkeleton size={40} />
							<TextSkeleton variant="body6" width="50%" />
						</Flex>
						<TextSkeleton variant="body2" width="40%" />
						<Flex direction="column" gap="4">
							<Flex align="center" gap="10">
								<TextSkeleton variant="body5-strong" width={60} />
								<TextSkeleton variant="body3-accent" width={60} />
							</Flex>
							<TextSkeleton variant="body3-accent" width={100} />
						</Flex>
					</Flex>
					<Flex direction="column" gap="24">
						<Skeleton height={40} width="100%" />
						<Flex direction="column" gap="14">
							{Array.from({ length: 4 }).map((_, index) => (
								<SubscriptionBenefitSkeleton key={index} />
							))}
						</Flex>
					</Flex>
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
