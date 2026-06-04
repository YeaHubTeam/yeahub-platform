import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './ReferralLinkCard.module.css';

export const ReferralLinkCardSkeleton = () => {
	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="20">
				<Skeleton width={250} height={10} borderRadius="4px" />
				<Skeleton width={300} height={10} borderRadius="4px" />
			</Flex>
		</Card>
	);
};
