import { FileLoaderSkeleton } from '@/shared/ui/FileLoader';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';

import styles from './ImageLoaderWithoutCropper.module.css';

export const ImageLoaderWithoutCropperSkeleton = () => {
	return (
		<Flex className={styles['picture-wrapper']} gap="32">
			<Flex className={styles['picture-block']} gap="8" direction="column">
				<ImageWithWrapperSkeleton className={styles['img']} />
			</Flex>

			<div className={styles['file-loader-wrapper']}>
				<FileLoaderSkeleton className={styles['file-loader']} />
			</div>
		</Flex>
	);
};
