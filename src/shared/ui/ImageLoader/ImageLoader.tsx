import { useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Button, Modal, ModalContent, ModalHeading } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';
import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/model/types/types';
import { Flex } from '../Flex';

import styles from './ImageLoader.module.css';

import 'cropperjs/dist/cropper.css';
interface ImageLoaderProps {
	setValue?: UseFormSetValue<FieldValues>;
	watch?: UseFormWatch<FieldValues>;
	imgSrc: string | null;
}

export const ImageLoader = ({ setValue, watch, imgSrc }: ImageLoaderProps) => {
	const [file, setFile] = useState<string | ArrayBuffer | null>(null);
	const [croppedArea, setCroppedArea] = useState<undefined | string>(undefined);
	const cropperRef = useRef<ReactCropperElement>(null);
	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		cropper && setCroppedArea(cropper.getCroppedCanvas().toDataURL());
	};

	const { t } = useI18nHelpers();
	const { t: tProfile } = useI18nHelpers(i18Namespace.profile);

	return (
		<Flex className={styles.container}>
			<Flex className={styles['profile-picture-wrapper']} gap="16">
				<Flex className={styles['profile-picture-block']} gap="8" direction="column">
					{imgSrc ? (
						<img className={styles.img} src={imgSrc} alt="avatar" />
					) : (
						<AvatarWithoutPhoto />
					)}
					<button type="button" className={styles['delete-avatar-btn']}>
						{tProfile('photo.deletePhotoButton')}
					</button>
				</Flex>
				<FileLoader
					maxFileMBSize={5}
					accept={Accept.IMAGE}
					fileTypeText={t('fileLoader.fileTypes.photo')}
					extensionsText={Extension.IMAGE}
					onChange={(_: File[]) => {
						const reader = new FileReader();
						reader.onload = () => {
							setFile(reader.result);
						};
					}}
				/>
			</Flex>
			{watch && watch('avatarImage') && (
				<button
					type="button"
					onClick={() => {
						setValue && setValue('avatarImage', undefined);
						setCroppedArea(undefined);
						setFile(null);
					}}
					className={styles['delete-avatar-btn']}
				>
					Удалить фото
				</button>
			)}
			<Modal open={!!file}>
				<ModalContent className={styles.content}>
					<ModalHeading className={styles.title}>Crop the image</ModalHeading>
					<Flex direction="column" gap="8" className={styles.modal}>
						{file && typeof file == 'string' && (
							<Cropper
								className={styles.cropper}
								ref={cropperRef}
								src={file}
								crop={onCrop}
								aspectRatio={1 / 1}
								viewMode={3}
							/>
						)}

						<Flex justify="between">
							<Button
								theme="primary"
								onClick={() => {
									//TODO: remove null check in futur
									setValue && setValue('avatarImage', croppedArea);
									setFile(null);
								}}
							>
								Готово
							</Button>
							<Button
								theme="outline"
								onClick={() => {
									setCroppedArea(undefined);
									setFile(null);
								}}
							>
								Отмена
							</Button>
						</Flex>
					</Flex>
				</ModalContent>
			</Modal>
		</Flex>
	);
};
