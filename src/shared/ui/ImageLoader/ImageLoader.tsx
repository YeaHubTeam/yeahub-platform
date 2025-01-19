import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Translation } from '@/shared/config/i18n/i18nTranslations';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';

import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';
import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/model/types/types';
import { Flex } from '../Flex';

import styles from './ImageLoader.module.css';
import './ImageLoaderCropper.css';

interface ImageLoaderProps {
	setValue?: (image: string | null) => void;
	cropper?: {
		aspectRatio: number;
		title: string;
		description: string;
	};
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
	isLoading?: boolean;
}

export const ImageLoader = ({
	setValue,
	cropper,
	maxResolution,
	minResolution,
	maxMBSize,
	initialSrc: src,
	isLoading,
}: ImageLoaderProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	const [file, setFile] = useState<string | ArrayBuffer | null>(null);
	const [deleted, setDeleted] = useState(false);
	const [croppedArea, setCroppedArea] = useState<null | string>(null);

	const cropperRef = useRef<ReactCropperElement>(null);

	const onCrop = () => {
		cropperRef.current?.cropper &&
			setCroppedArea(
				cropperRef.current?.cropper
					.getCroppedCanvas()
					.toDataURL()
					.replace('data:image/png;base64,', ''),
			);
	};

	const uploaderRef = useRef<HTMLDivElement>(null);

	const submitImage = () => {
		setValue && setValue(croppedArea);
		setDeleted(false);
		setFile(null);
	};

	const removeImage = () => {
		setValue && setValue(null);
		setDeleted(true);
		setCroppedArea(null);
		setFile(null);
	};

	const replaceImage = () => {
		uploaderRef.current?.getElementsByTagName('input')[0].click();
	};

	const closeModal = () => setFile(null);

	const handleUpload = ([file]: File[]) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const imageReader = new Image();
			imageReader.src = String(reader.result);
			imageReader.onload = () => {
				if (
					minResolution &&
					(imageReader.width < minResolution.width || imageReader.height < minResolution.height)
				) {
					toast(
						t(Profile.PHOTO_MODAL_MIN_RES, {
							minRes: `${minResolution.width}x${minResolution.height}`,
						}),
					);
					return;
				}

				if (
					maxResolution &&
					(imageReader.width > maxResolution.width || imageReader.height > maxResolution.height)
				) {
					toast(
						t(Profile.PHOTO_MODAL_MAX_RES, {
							maxRes: `${maxResolution.width}x${maxResolution.height}`,
						}),
					);
					return;
				}

				if (cropper) {
					setFile(reader.result);
				} else {
					setCroppedArea(String(reader.result).replace('data:image/png;base64,', ''));
					setValue && setValue(String(reader.result).replace('data:image/png;base64,', ''));
				}
			};
		};
	};

	return (
		<div className={styles.container}>
			<Flex className={styles['profile-picture-wrapper']} gap="40">
				<Flex className={styles['profile-picture-block']} gap="8" direction="column">
					{isLoading && (
						<Loader
							hasText={false}
							style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
						/>
					)}
					{!deleted && src ? (
						<img
							src={(croppedArea && 'data:image/png;base64,' + croppedArea) || src}
							alt={t(Profile.PHOTO_TITLE)}
							className={styles.img}
						/>
					) : (
						<AvatarWithoutPhoto />
					)}
					{!deleted && src && (
						<button type="button" className={styles['delete-avatar-btn']} onClick={removeImage}>
							{t(Profile.PHOTO_DELETE)}
						</button>
					)}
				</Flex>
				<div ref={uploaderRef}>
					<FileLoader
						maxFileMBSize={maxMBSize}
						accept={Accept.IMAGE}
						fileTypeText={t(Translation.FILE_LOADER_TYPES_PHOTO, { ns: i18Namespace.translation })}
						extensionsText={Extension.IMAGE}
						onChange={handleUpload}
					/>
				</div>
			</Flex>

			<Modal
				isOpen={Boolean(cropper && file)}
				title={t(Profile.PHOTO_MODAL_TITLE)}
				onClose={closeModal}
				buttonPrimaryText={t(Profile.PHOTO_MODAL_SUBMIT)}
				buttonOutlineText={t(Profile.PHOTO_MODAL_CLICK_SECONDARY)}
				buttonPrimaryClick={submitImage}
				buttonOutlineClick={replaceImage}
			>
				<Flex direction="column" gap="8">
					{!!cropper && (
						<Flex direction="column" gap="8" className={styles['cropper-info']}>
							<p>{cropper?.title}</p>
							<p>{cropper?.description}</p>
						</Flex>
					)}
					<Flex gap="16" justify="center">
						{file && typeof file == 'string' && (
							<Cropper
								className={styles.cropper}
								ref={cropperRef}
								src={file}
								crop={onCrop}
								aspectRatio={cropper?.aspectRatio}
								viewMode={2}
							/>
						)}
						<Flex direction="column" align="end">
							<img
								src={'data:image/png;base64,' + croppedArea}
								className={classNames(styles['avatar-preview'], styles['large-preview'])}
								alt={t(Profile.PHOTO_MODAL_LARGE_PREVIEW)}
							/>
							<img
								src={'data:image/png;base64,' + croppedArea}
								className={classNames(styles['avatar-preview'], styles['small-preview'])}
								alt={t(Profile.PHOTO_MODAL_SMALL_PREVIEW)}
							/>
						</Flex>
					</Flex>
				</Flex>
			</Modal>
		</div>
	);
};
