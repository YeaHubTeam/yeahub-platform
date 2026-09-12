import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import { CollectionAdditionalInfoDrawerSkeleton } from '../CollectionAdditionalInfoDrawer/CollectionAdditionalInfoDrawer.skeleton';

import styles from './CollectionHeader.module.css';

export const CollectionHeaderSkeleton = () => {
	const { isMobileS, isSmallScreen } = useScreenSize();
	const imageClassName = isMobileS ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex gap="20" direction={isMobileS ? 'column' : 'row'}>
				<ImageWithWrapperSkeleton className={classNames(styles.image, imageClassName)} />
				<Flex flex={1} direction="column">
					<Flex direction="row" gap="8" justify="between" align="start">
						<TextSkeleton variant="head2" width="100%" className={styles.title} />
						{isSmallScreen && <CollectionAdditionalInfoDrawerSkeleton />}
					</Flex>
					<TextSkeleton variant="body3-accent" width="100%" maxRows={!isMobileS ? 3 : 2} />
				</Flex>
			</Flex>
		</Card>
	);
};

{
	/* <Skeleton width="80%" height={24} /> <Skeleton width="100%" height={isMobileS ? 64 : 124} /> */
}
