import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './SubscribeToMedia.module.css';

export const SubscribeToMediaSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Card className={styles.card}>
			<Flex direction="column" gap="16">
				<Skeleton width={370} height={20} />

				<Flex direction="column" gap="8">
					<Skeleton width="90%" height={12} />
					<Skeleton width="30%" height={12} />
				</Flex>

				<Flex gap={isMobileS ? '8' : '16'} direction="column">
					<Flex gap="8" align="center">
						<Skeleton width={20} height={20} />
						<Skeleton width={'60%'} height={12} />
					</Flex>

					<Flex gap="8" align="center">
						<Skeleton width={20} height={20} />
						<Skeleton width={'100%'} height={12} />
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};
