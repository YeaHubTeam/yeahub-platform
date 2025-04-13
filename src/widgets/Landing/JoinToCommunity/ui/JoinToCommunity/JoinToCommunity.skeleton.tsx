import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { CommunityBenefitsListSkeleton } from '../CommunityBenefitsList/CommunityBenefitsList.skeleton';

import styles from './JoinToCommunity.module.css';

export const JoinToCommunitySkeleton = () => {
	return (
		<Card className={styles.card}>
			<Flex direction="column" gap="16">
				<Flex gap="10" align="center">
					<Skeleton width={24} height={24} borderRadius="50%" />
					<Skeleton width={210} height={20} />
				</Flex>
				<Flex direction="column" gap="8">
					<Skeleton width="100%" height={12} />
					<Skeleton width="35%" height={12} />
				</Flex>
				<CommunityBenefitsListSkeleton />
				<Skeleton style={{ marginLeft: 'auto' }} height={20} width={240} borderRadius={12} />
			</Flex>
		</Card>
	);
};
