import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { FileLoader } from '@/shared/ui/FileLoader';
import { Accept, Extension } from '@/shared/ui/FileLoader/model/types/types';
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
	isFileLoading: boolean;
	initialSrc: string | null;
}

export const ImageLoaderWithoutCropper = ({
	changeImage,
	removeImage,
	maxMBSize,
	isFileLoading,
	initialSrc: src,
}: ImageLoaderWithoutCropperProps) => {
	const { t } = useTranslation('translation');
	const [isLoading, setIsLoading] = useState(isFileLoading || false);

	const uploaderRef = useRef<HTMLDivElement | null>(null);

	const handleUpload = ([file]: File[]) => {
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
					<button type="button" className={styles['delete-btn']} onClick={removeImage}>
						{t(Translation.IMAGELOADER_DELETE)}
					</button>
				)}
			</Flex>

			<div ref={uploaderRef} className={styles['file-loader-wrapper']}>
				<FileLoader
					className={styles['file-loader']}
					maxFileMBSize={maxMBSize}
					accept={Accept.IMAGE}
					fileTypeText={t(Translation.FILELOADER_FILETYPES_PHOTO)}
					extensionsText={Extension.IMAGE}
					onChange={handleUpload}
				/>
			</div>
		</Flex>
	);
};
