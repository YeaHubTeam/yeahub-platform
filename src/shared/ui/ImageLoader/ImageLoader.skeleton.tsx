import { FileLoaderSkeleton } from '@/shared/ui/FileLoader';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { ImageLoaderProps } from './ImageLoader';
import styles from './ImageLoader.module.css';

export const ImageLoaderSkeleton = ({ isPopover }: Partial<ImageLoaderProps>) => {
	return (
		<div className={styles.container}>
			<Flex className={styles['profile-picture-wrapper']} gap="40">
				<Flex className={styles['profile-picture-block']} gap="8" direction="column">
					<Skeleton width="100%" height="100%" />
				</Flex>
				<div className={styles['file-loader']}>
					<FileLoaderSkeleton isDragDropEnabled={!isPopover} />
				</div>
			</Flex>
		</div>
	);
};
