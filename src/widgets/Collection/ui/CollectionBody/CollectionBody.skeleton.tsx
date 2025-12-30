import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './CollectionBody.module.css';

export const CollectionBodySkeleton = () => {
	const { isMobile, isMobileS } = useScreenSize();
	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<div className={styles.title}>
				<Skeleton width={190} height={isMobileS ? 24 : 29} />
			</div>
			<Flex componentType="ul" direction="column" gap="12">
				{[...Array(4)].map((_, index) => (
					<Flex key={index} gap="8" className={styles.question}>
						{!isMobileS && <Skeleton width={70} height={50} />}
						<Flex direction="column" gap="8">
							<Skeleton width={isMobileS ? 200 : 250} height={21} />
							<Flex gap={isMobile ? '12' : '24'}>
								<Skeleton width={100} height={32} />
								<Skeleton width={100} height={32} />
							</Flex>
						</Flex>
					</Flex>
				))}
			</Flex>
		</Card>
	);
};
