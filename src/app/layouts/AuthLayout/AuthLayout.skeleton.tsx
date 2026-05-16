import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './AuthLayout.skeleton.module.css';
import { SkeletonGenerator } from './SkeletonGenerator/SkeletonGenerator';

const BENEFITS_COUNT = 5;

export const AuthLayoutSkeleton = () => {
	return (
		<div data-testid="AuthLayoutSkeleton_Wrapper" className={styles.container}>
			<aside data-testid="AuthLayoutSkeleton_Aside" className={styles.aside} aria-hidden="true">
				<Flex direction="column" justify="between" className={styles['content-wrapper']}>
					<Flex direction="column" gap="8">
						<Skeleton width={140} height={35} borderRadius={8} />
						<Skeleton width={280} height={20} borderRadius={4} />
					</Flex>

					<Flex direction="column" gap="20">
						<Skeleton width={305} height={45} borderRadius={8} />
						<Flex direction="column" gap="16">
							{Array.from({ length: BENEFITS_COUNT }).map((_, i) => (
								<Flex key={`benefit-skeleton-${i}`} align="center" gap="12">
									<Skeleton width={18} height={18} borderRadius="50%" />
									<Skeleton width={305} height={18} borderRadius={4} />
								</Flex>
							))}
						</Flex>
					</Flex>
				</Flex>
			</aside>

			<div className={styles['logo-wrapper']} aria-hidden="true">
				<Skeleton width={120} height={32} borderRadius={8} />
			</div>

			<SkeletonGenerator />
		</div>
	);
};
