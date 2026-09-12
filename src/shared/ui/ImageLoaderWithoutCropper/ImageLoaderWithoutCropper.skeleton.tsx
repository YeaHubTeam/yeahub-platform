import { FileLoaderSkeleton } from '../FileLoader';
import { Flex } from '../Flex';
import { ImageWithWrapperSkeleton } from '../ImageWithWrapper';

import styles from './ImageLoaderWithoutCropper.module.css';

export const ImageLoaderWithoutCropperSkeleton = () => {
	return (
		<Flex gap="32" maxWidth={true}>
			<ImageWithWrapperSkeleton height={114} width={170} borderRadius={20} />
			<FileLoaderSkeleton isDragDropEnabled={true} className={styles['file-loader-skeleton']} />
		</Flex>
	);
};
