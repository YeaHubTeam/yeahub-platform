import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Profile, Translation } from '@/shared/config';
import { FileLoader } from '@/shared/ui/FileLoader';
import { Accept, Extension } from '@/shared/ui/FileLoader/types';
import { Flex } from '@/shared/ui/Flex';
import { Loader } from '@/shared/ui/Loader';

import { ImageWithWrapper } from '../ImageWithWrapper';

import styles from './ImageLoaderWithoutCropper.module.css';

interface ImageLoaderWithoutCropperProps {
	changeImage: (image: string) => void;
	removeImage: () => void;
	maxMBSize?: number;
	minResolution?: {
		width: number;
		height: number;
	};
	maxResolution?: {
		width: number;
		height: number;
	};
	initialSrc: string | null;
	disabled?: boolean;
}

export const ImageLoaderWithoutCropper = ({
	changeImage,
	removeImage,
	maxMBSize,
	initialSrc: src,
	disabled,
}: ImageLoaderWithoutCropperProps) => {
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.profile]);
	const [isLoading, setIsLoading] = useState(false);

	const uploaderRef = useRef<HTMLDivElement | null>(null);

	const handleUpload = ([file]: File[]) => {
		if (disabled) return null;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		setIsLoading(true);

		reader.onload = () => {
			const imageReader = new Image();
			const readerResultBase64 = String(reader.result);
			imageReader.src = readerResultBase64;
			imageReader.onload = () => {
				changeImage(readerResultBase64);
				setIsLoading(false);
			};
		};
	};

	return (
		<Flex className={styles['picture-wrapper']} gap="32">
			<Flex className={styles['picture-block']} gap="8" direction="column">
				{isLoading && <Loader hasText={false} className={styles.loader} />}

				{!isLoading && <ImageWithWrapper src={src} alt={'skill icon'} className={styles.img} />}

				{!isLoading && src && (
					<button
						disabled={disabled}
						type="button"
						className={styles['delete-btn']}
						onClick={removeImage}
					>
						{t(Profile.PHOTO_DELETE, { ns: i18Namespace.profile })}
					</button>
				)}
			</Flex>

			<div ref={uploaderRef} className={styles['file-loader-wrapper']}>
				<FileLoader
					disabled={disabled}
					className={styles['file-loader']}
					maxFileMBSize={maxMBSize}
					accept={Accept.IMAGE}
					fileTypeText={t(Translation.FILE_LOADER_TYPES_PHOTO)}
					extensionsText={Extension.IMAGE}
					onChange={handleUpload}
				/>
			</div>
		</Flex>
	);
};
