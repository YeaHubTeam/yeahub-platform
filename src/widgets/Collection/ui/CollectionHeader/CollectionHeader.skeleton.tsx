import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './CollectionHeader.module.css';

export const CollectionHeaderSkeleton = () => {
	const { isMobileS } = useScreenSize();
	const imageClassName = isMobileS ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex gap="20" direction={isMobileS ? 'column' : 'row'}>
				<Skeleton className={classNames(styles.image, imageClassName)} />
				<Flex direction="column" gap="8" maxWidth>
					<Skeleton width="80%" height={24} />
					<Skeleton width="100%" height={isMobileS ? 64 : 124} />
				</Flex>
			</Flex>
		</Card>
	);
};
