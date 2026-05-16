import { PropsWithChildren } from 'react';

import { Card } from '../Card';
import { Flex } from '../Flex';
import { Skeleton } from '../Skeleton/Skeleton';

import styles from './SkeletonBlock.module.css';

export const SkeletonBlock = ({ children }: PropsWithChildren) => {
	return (
		<Card className={styles['card-skeleton']}>
			<div className={styles['header-card-skeleton']}>
				<Flex gap="16" justify="between">
					<Skeleton width={81} height={27} />
					<div style={{ flex: '1 0' }}>
						<div className={styles['sleleton-link']}>
							<Skeleton width="100%" height="100%" />
						</div>
					</div>
				</Flex>
			</div>
			{children}
		</Card>
	);
};
