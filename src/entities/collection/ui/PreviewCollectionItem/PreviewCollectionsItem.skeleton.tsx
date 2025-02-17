import { CollectionParamSkeleton } from '@/shared/ui/CollectionParam';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './PreviewCollectionsItem.module.css';

export const PreviewCollectionsItemSkeleton = () => {
	return (
		<Flex direction="row" componentType="li" gap="8" className={styles.wrapper}>
			<ImageWithWrapperSkeleton className={styles['image-wrapper']} />
			<Flex gap="24" className={styles['wrapper-content']}>
				<Flex direction="row" gap="20">
					<CollectionParamSkeleton />
				</Flex>

				<TextSkeleton variant="body3-accent" width={280} className={styles['title-skeleton']} />
				<TextSkeleton variant={'body3-accent'} width={40} />

				<Flex direction="row" gap="20">
					<TextSkeleton variant={'body3-accent'} width={50} />
					<TextSkeleton variant={'body3-accent'} width={50} />
				</Flex>
			</Flex>
		</Flex>
	);
};
