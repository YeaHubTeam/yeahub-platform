import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './ReferralLinkAdditionalInfo.module.css';

export const ReferralLinkAdditionalInfoSkeleton = () => {
	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="24">
				<Flex direction="column" gap="16">
					<Skeleton width={60} height={10} borderRadius="4px" />
					<Skeleton width={53} height={37} borderRadius="12" />
				</Flex>
				<Flex direction="column" gap="16">
					<Skeleton width={120} height={10} borderRadius="4px" />
					<Skeleton width={39} height={39} borderRadius="12" />
				</Flex>
				<Flex direction="column" gap="16">
					<Skeleton width={120} height={10} borderRadius="4px" />
					<Skeleton width={106} height={39} borderRadius="12" />
				</Flex>
				<Flex direction="column" gap="16">
					<Skeleton width={120} height={10} borderRadius="4px" />
					<Skeleton width={106} height={39} borderRadius="12" />
				</Flex>
				<Skeleton width={200} height={10} borderRadius="4px" />
			</Flex>
		</Card>
	);
};
