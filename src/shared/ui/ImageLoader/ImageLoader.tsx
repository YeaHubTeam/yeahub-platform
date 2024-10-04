import { useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Button, Modal, ModalContent, ModalHeading } from 'yeahub-ui-kit';

import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';
import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/model/types/types';
import { Flex } from '../Flex';

import styles from './ImageLoader.module.css';

import 'cropperjs/dist/cropper.css';
interface ImageLoaderProps {
	setValue?: UseFormSetValue<FieldValues>;
	watch?: UseFormWatch<FieldValues>;
}
export const ImageLoader = ({ setValue, watch }: ImageLoaderProps) => {
	const [file, setFile] = useState<string | ArrayBuffer | null>(null);
	const [croppedArea, setCroppedArea] = useState<undefined | string>(undefined);
	const cropperRef = useRef<ReactCropperElement>(null);
	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		cropper && setCroppedArea(cropper.getCroppedCanvas().toDataURL());
	};

	return (
		<div className={styles.container}>
			<div className={styles['profile-picture-wrapper']}>
				{croppedArea ? <img src={croppedArea} alt="" /> : <AvatarWithoutPhoto />}

				<FileLoader
					maxFileMBSize={5}
					accept={Accept.IMAGE}
					fileTypeText={'фотографию'}
					extensionsText={Extension.IMAGE}
					onChange={(_: File[]) => {
						const reader = new FileReader();
						reader.onload = () => {
							setFile(reader.result);
						};
					}}
				/>
			</div>
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
		</div>
	);
};
