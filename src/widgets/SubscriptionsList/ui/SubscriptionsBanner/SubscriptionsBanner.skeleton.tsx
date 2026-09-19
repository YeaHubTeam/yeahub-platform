import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './SubscriptionsBanner.module.css';

export const SubscriptionsBannerSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow withBorder>
			<Flex direction="column" gap="8">
				<TextSkeleton variant="body3-strong" width="30%" />
				<TextSkeleton variant="body2" width="20%" />
				<Flex componentType="ul" className={styles.list}>
					{Array.from({ length: 5 }).map((_, index) => (
						<li key={index}>
							<TextSkeleton variant="body2" width="90%" />
						</li>
					))}
					<TextSkeleton variant="body2-accent" width={40} className={styles.thanks} />
				</Flex>
			</Flex>
		</CardSkeleton>
	);
};
