import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { SubscriptionCardSkeleton } from '../SubscriptionCard/SubscriptionCard.skeleton';
import { SubscriptionsBannerSkeleton } from '../SubscriptionsBanner/SubscriptionsBanner.skeleton';

import styles from './SubscriptionsList.module.css';

export const SubscriptionsListSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<CardSkeleton withOutsideShadow>
			<Flex direction="column" gap="20">
				<Flex direction="column" gap={isMobile ? '8' : '12'}>
					<TextSkeleton variant={isMobile ? 'body5-accent' : 'head3'} width={250} />
					<TextSkeleton
						width={400}
						className={styles.subtitle}
						variant={isMobile ? 'body2' : 'body3'}
					/>
				</Flex>
				<Flex gap="20" wrap="wrap" className={styles.list}>
					{Array.from({ length: 4 }).map((_, index) => (
						<SubscriptionCardSkeleton key={index} />
					))}
				</Flex>
				<SubscriptionsBannerSkeleton />
			</Flex>
		</CardSkeleton>
	);
};
