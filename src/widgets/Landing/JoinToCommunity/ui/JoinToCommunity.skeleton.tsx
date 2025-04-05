import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './JoinToCommunity.module.css';

export const JoinToCommunitySkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Card className={styles.card}>
			<Flex direction="column" gap="16">
				<Flex gap="10">
					<Skeleton width={24} height={24} borderRadius="50%" />
					<Skeleton width={220} height={20} />
				</Flex>

				<Flex direction="column" gap="16">
					<Flex direction="column" gap="8">
						<Skeleton width="100%" height={12} />
						<Skeleton width="30%" height={12} />
					</Flex>

					<Flex gap={isMobileS ? '8' : '16'} direction={isMobileS ? 'column' : 'row'}>
						<Flex direction="column" gap="8">
							{Array(2)
								.fill(0)
								.map((_, i) => (
									<Flex key={i} gap="8" align="center">
										<Skeleton width={20} height={20} />
										<Skeleton width={150} height={20} />
									</Flex>
								))}
						</Flex>

						<Flex direction="column" gap="8">
							{Array(2)
								.fill(0)
								.map((_, i) => (
									<Flex key={i} gap="8" align="center">
										<Skeleton width={20} height={20} />
										<Skeleton width={150} height={20} />
									</Flex>
								))}
						</Flex>
					</Flex>

					<Skeleton height={20} width={240} borderRadius={12} className={styles['member-button']} />
				</Flex>
			</Flex>
		</Card>
	);
};
