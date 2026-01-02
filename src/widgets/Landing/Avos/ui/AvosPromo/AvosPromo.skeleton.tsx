import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AvosPromo.module.css';

export const AvosPromoSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="between" gap="20">
				<Flex direction="column" className={styles.content}>
					<TextSkeleton variant="body5" width="150px" />
					<TextSkeleton variant="body3" width="250px" className={styles.subtitle} />

					<Skeleton
						className={classNames(
							styles['tablet-screenshot'],
							styles['tablet-screenshot-skeleton'],
						)}
					/>

					<Flex wrap="wrap" gap={isMobileS ? '8' : '12'} className={styles.chips}>
						{Array.from({ length: 3 }, (_, i) => (
							<Skeleton key={i} width={150} height={42} borderRadius="16px" />
						))}
					</Flex>

					<TextSkeleton variant="body3" width="200px" className={styles.sum} />
					<Skeleton
						height={48}
						className={classNames(styles.button, styles['button-skeleton'])}
						borderRadius="8px"
					/>
				</Flex>

				<Skeleton className={styles.screenshot} width="100%" height={350} />
			</Flex>
		</Card>
	);
};
