import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Profile, Translation } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { toast } from '@/shared/ui/Toast';

import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';
import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/types';
import { Flex } from '../Flex';
import { Text } from '../Text';

import styles from './ImageLoader.module.css';
import './ImageLoaderCropper.css';

export interface ImageLoaderProps {
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
	isPopover?: boolean;
	isOpenProp?: boolean;
	onClose?: () => void;
}

export const ImageLoader = ({
	setValue,
	cropper,
	maxResolution,
	minResolution,
	maxMBSize,
	initialSrc: src,
	isLoading,
	isPopover = false,
	isOpenProp = false,
	onClose,
}: ImageLoaderProps) => {
	const { t } = useTranslation(i18Namespace.profile);
	const [file, setFile] = useState<string | ArrayBuffer | null>(isOpenProp ? src : null);
	const [deleted, setDeleted] = useState(false);
	const [croppedArea, setCroppedArea] = useState<null | string>(null);

	useEffect(() => {
		if (isOpenProp) {
			setFile(src);
		}
	}, [isOpenProp, src]);

	const cropperRef = useRef<ReactCropperElement>(null);

	const onCrop = () => {
		if (cropperRef.current?.cropper) {
			setCroppedArea(
				cropperRef.current.cropper
					.getCroppedCanvas()
					.toDataURL()
					.replace('data:image/png;base64,', ''),
			);
		}
	};

	const uploaderRef = useRef<HTMLDivElement>(null);

	const onSubmitImage = () => {
		setValue && setValue(croppedArea);
		setDeleted(false);
		setFile(null);
	};

	const onRemoveImage = () => {
		setValue && setValue(null);
		setDeleted(true);
		setCroppedArea(null);
		setFile(null);
	};

	const onReplaceImage = () => {
		uploaderRef.current?.getElementsByTagName('input')[0].click();
	};

	const onCloseModal = () => {
		setFile(null);
		setCroppedArea(null);
		onClose && onClose();
	};

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
					toast.error(
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
					toast.error(
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
							loading="lazy"
						/>
					) : (
						<AvatarWithoutPhoto />
					)}
					{!deleted && src && (
						<Button
							fullWidth
							variant="destructive-tertiary"
							className={styles['delete-avatar-btn']}
							onClick={onRemoveImage}
							type="button"
						>
							{t(Profile.PHOTO_DELETE)}
						</Button>
					)}
				</Flex>
				<div className={styles['file-loader']} ref={uploaderRef}>
					<FileLoader
						maxFileKBSize={maxMBSize}
						accept={Accept.IMAGE}
						fileTypeText={t(Translation.FILE_LOADER_TYPES_PHOTO, {
							ns: i18Namespace.translation,
						})}
						extensionsText={Extension.IMAGE}
						onChange={handleUpload}
						isDragDropEnabled={!isPopover}
					/>
				</div>
			</Flex>

			<Modal
				isOpen={isOpenProp || Boolean(cropper && file)}
				title={t(Profile.PHOTO_MODAL_TITLE)}
				onClose={onCloseModal}
				buttonPrimaryText={t(Profile.PHOTO_MODAL_SUBMIT)}
				buttonOutlineText={t(Profile.PHOTO_MODAL_CLICK_SECONDARY)}
				buttonPrimaryClick={onSubmitImage}
				buttonOutlineClick={onReplaceImage}
			>
				<Flex direction="column" gap="8">
					{!!cropper && (
						<Flex direction="column" className={styles['cropper-info']}>
							<Text variant="body3-accent">{cropper?.title}</Text>
							<Text variant="body3-accent">{cropper?.description}</Text>
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
								loading="lazy"
							/>
							<img
								src={'data:image/png;base64,' + croppedArea}
								className={classNames(styles['avatar-preview'], styles['small-preview'])}
								alt={t(Profile.PHOTO_MODAL_SMALL_PREVIEW)}
								loading="lazy"
							/>
						</Flex>
					</Flex>
				</Flex>
			</Modal>
		</div>
	);
};
