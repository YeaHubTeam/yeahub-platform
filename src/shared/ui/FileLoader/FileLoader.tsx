/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames';
import { DragEvent, RefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CheckSquare from '@/shared/assets/icons/checkSquare.svg';
import Warning from '@/shared/assets/icons/warning.svg';
import Gallery from '@/shared/assets/images/Gallery.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useDragAndDrop } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import style from './FileLoader.module.css';
import { Accept, Extension } from './types';

export interface FileLoaderProps {
	accept: Accept;
	multiply?: boolean;
	maxFileKBSize?: number;
	fileTypeText: string;
	className?: string;
	extensionsText: Extension;
	onChange: (files: globalThis.File[]) => void;
	isDragDropEnabled?: boolean;
	disabled?: boolean;
}

export const FileLoader = ({
	className,
	accept,
	fileTypeText,
	maxFileKBSize,
	extensionsText,
	multiply = false,
	onChange,
	isDragDropEnabled = true,
	disabled,
}: FileLoaderProps) => {
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);

	const [files, setFiles] = useState<globalThis.File[]>([]);
	const [error, setError] = useState<null | 'ErrorSize' | 'ErrorWeight'>(null);
	const [isUploaded, setIsUploaded] = useState<boolean>(false);

	const { t } = useTranslation(i18Namespace.translation);

	const { isDragActive, onDragLeave, handleUploader, onDragOverAndEnter, handleIsDragActive } =
		useDragAndDrop(uploaderRef);

	const clearInputState = (input: HTMLInputElement) => {
		input.value = '';
	};

	const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			const reader = new FileReader();

			reader.onload = (e) => {
				img.onload = () => resolve({ width: img.width, height: img.height });
				img.onerror = reject;
				img.src = e.target?.result as string;
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const handleChange = async () => {
		setIsUploaded(false);
		setError(null);
		if (disabled) return null;
		if (uploaderRef.current) {
			const refFiles = uploaderRef?.current.files;
			if (refFiles && refFiles.length > 0) {
				const file = Array.from(refFiles);

				if (maxFileKBSize && file[0].size / 1024 > maxFileKBSize) {
					setError('ErrorWeight');
					clearInputState(uploaderRef.current);
					return;
				}

				if (!multiply) {
					try {
						const { width, height } = await getImageDimensions(file[0]);
						if (width !== height) {
							setError('ErrorSize');
							clearInputState(uploaderRef.current);
							return;
						}
					} catch {
						setError('ErrorSize');
						clearInputState(uploaderRef.current);
						return;
					}

					setFiles([file[0]]);
					onChange([file[0]]);

					clearInputState(uploaderRef.current);
					setIsUploaded(true);
					return;
				}

				const updatedList = [...files, ...file];

				setFiles(updatedList);
				onChange(updatedList);

				clearInputState(uploaderRef.current);
			}
		}
	};

	const onDrop = async (e: DragEvent<HTMLDivElement>) => {
		setIsUploaded(false);
		setError(null);
		if (disabled) return null;
		e.preventDefault();
		const transferFiles = e.dataTransfer.files;
		handleIsDragActive(false);

		if (transferFiles && transferFiles.length > 0) {
			const file = Array.from(transferFiles);

			if (!multiply) {
				if (maxFileKBSize && file[0].size / 1024 > maxFileKBSize) {
					setError('ErrorWeight');
					return;
				}
				try {
					const { width, height } = await getImageDimensions(file[0]);
					if (width !== height) {
						setError('ErrorSize');
						return;
					}
				} catch {
					setError('ErrorSize');
					return;
				}

				setFiles([file[0]]);
				onChange([file[0]]);
				setIsUploaded(true);
				return;
			}

			const updatedList = [...files, ...file];
			setFiles(updatedList);
			onChange(updatedList);
		}
	};

	return (
		<Flex
			direction="column"
			justify="center"
			align="center"
			gap="12"
			tabIndex={0}
			role={'button'}
			onDrop={onDrop}
			onClick={handleUploader}
			onDragLeave={onDragLeave}
			onDragOver={onDragOverAndEnter}
			onDragEnter={onDragOverAndEnter}
			className={classNames(
				style['file-upload-container'],
				{
					[style.active]: isDragActive,
					[style.disabled]: disabled,
					[style.error]: error,
					[style['is-uploaded']]: isUploaded,
				},
				className,
			)}
		>
			{isDragDropEnabled && (
				<>
					{!isUploaded && !error && (
						<div>
							<img src={Gallery} alt={t(Translation.FILE_LOADER_TYPES_PHOTO)} loading="lazy" />
						</div>
					)}

					{error && <Warning aria-hidden="true" className={style['warning-icon']} />}
					{isUploaded && <CheckSquare aria-hidden="true" className={style['check-square-icon']} />}
					<Flex align="center" gap="4" justify="center" wrap="wrap">
						<Text variant="body2" color="purple-700" isNoWrap>
							{t(Translation.FILE_LOADER_LINK)}
						</Text>
						<Text variant="body2" color="black-500" isNoWrap>
							{t(Translation.FILE_LOADER_TEXT)} {fileTypeText}
						</Text>
					</Flex>
					<Flex direction="column">
						{error === 'ErrorWeight' && (
							<>
								<Text variant="body1" color="red-600">
									{t(Translation.FILE_LOADER_ERROR_WEIGHT, { maxFileKBSize })}
								</Text>
								<Flex align="center" gap="4">
									<Text variant="body1" color="black-300">
										{t(Translation.FILE_LOADER_ERROR_COMPRESS)}
									</Text>
									<a
										className={style['file-link']}
										href="https://www.iloveimg.com/compress-image"
										target="_blank"
										onClick={(e) => e.stopPropagation()}
										rel="noopener noreferrer"
									>
										iloveimg.com/compress-image
									</a>
								</Flex>
							</>
						)}
						{error === 'ErrorSize' && (
							<>
								<Text variant="body1" color="red-600">
									{t(Translation.FILE_LOADER_ERROR_SIZE)}
								</Text>
								<Flex align="center" gap="4">
									<Text variant="body1" color="black-300">
										{t(Translation.FILE_LOADER_ERROR_CROP)}
									</Text>
									<a
										className={style['file-link']}
										href="https://www.iloveimg.com/crop-image"
										target="_blank"
										onClick={(e) => e.stopPropagation()}
										rel="noopener noreferrer"
									>
										iloveimg.com/crop-image
									</a>
								</Flex>
							</>
						)}

						{!error && (
							<>
								{isUploaded && (
									<Text variant="body1" color="green-900">
										{t(Translation.FILE_LOADER_UPLOADED)}
									</Text>
								)}

								<Text variant="body1" color="black-300">
									{extensionsText}
									{maxFileKBSize && ` (${t(Translation.FILE_LOADER_LIMIT, { maxFileKBSize })})`}
								</Text>
								<Text variant="body1" color="black-300">
									{t(Translation.FILE_LOADER_SIZE)}
								</Text>
								<Text variant="body1" color="black-300">
									{t(Translation.FILE_LOADER_SQUARE)}
								</Text>
							</>
						)}
					</Flex>
				</>
			)}
			<input
				type="file"
				accept={accept}
				ref={uploaderRef}
				onChange={handleChange}
				multiple={multiply}
				className={style['file-input']}
				disabled={disabled}
			/>
		</Flex>
	);
};
