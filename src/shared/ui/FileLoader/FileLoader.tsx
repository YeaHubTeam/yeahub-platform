/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames';
import { DragEvent, RefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Gallery from '@/shared/assets/images/gallery.avif';
import { i18Namespace, Resume } from '@/shared/config';
import { Translation } from '@/shared/config';
import { useDragAndDrop, useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './FileLoader.module.css';
import { FileLoaderResumeBorder } from './FileLoaderResumeBorder/FileLoaderResumeBorder';
import { Accept, Extension } from './types';

export interface FileLoaderProps {
	accept: Accept;
	multiply?: boolean;
	maxFileMBSize?: number;
	fileTypeText: string;
	className?: string;
	extensionsText: Extension;
	onChange: (files: globalThis.File[]) => void;
	isDragDropEnabled?: boolean;
	disabled?: boolean;
	isResume?: boolean;
}

export const FileLoader = ({
	className,
	accept,
	fileTypeText,
	maxFileMBSize,
	extensionsText,
	multiply = false,
	onChange,
	isDragDropEnabled = true,
	disabled,
	isResume = false,
}: FileLoaderProps) => {
	const { isMobileS } = useScreenSize();
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);
	const [files, setFiles] = useState<globalThis.File[]>([]);
	const { t: tTranslation } = useTranslation(i18Namespace.translation);
	const { t: tResume } = useTranslation(i18Namespace.resume);
	const { isDragActive, onDragLeave, handleUploader, onDragOverAndEnter, handleIsDragActive } =
		useDragAndDrop(uploaderRef);

	const clearInputState = (input: HTMLInputElement) => {
		input.value = '';
	};

	const handleChange = () => {
		if (disabled) return null;
		if (uploaderRef.current) {
			const refFiles = uploaderRef?.current.files;
			if (refFiles && refFiles.length > 0) {
				const file = Array.from(refFiles);

				if (!multiply) {
					setFiles([file[0]]);
					onChange([file[0]]);

					clearInputState(uploaderRef.current);

					return;
				}

				const updatedList = [...files, ...file];

				setFiles(updatedList);
				onChange(updatedList);

				clearInputState(uploaderRef.current);
			}
		}
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		if (disabled) return null;
		e.preventDefault();
		const transferFiles = e.dataTransfer.files;
		handleIsDragActive(false);

		if (transferFiles && transferFiles.length > 0) {
			const file = Array.from(transferFiles);

			if (!multiply) {
				setFiles([file[0]]);
				onChange([file[0]]);
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
			role="button"
			onDrop={onDrop}
			onClick={handleUploader}
			onDragLeave={onDragLeave}
			onDragOver={onDragOverAndEnter}
			onDragEnter={onDragOverAndEnter}
			className={classNames(
				styles['file-upload-container'],
				{
					[styles.active]: isDragActive,
					[styles.disabled]: disabled,
					[styles['resume']]: isResume,
				},
				className,
			)}
		>
			{isDragDropEnabled && (
				<>
					{isResume && <FileLoaderResumeBorder />}
					{isResume ? (
						<Icon
							className={styles['resume-icon-loader']}
							icon="downloadFile"
							color="purple-700"
							size={46}
						/>
					) : (
						<div>
							<img
								src={Gallery}
								alt={tTranslation(Translation.FILE_LOADER_TYPES_PHOTO)}
								loading="lazy"
							/>
						</div>
					)}
					<Flex
						align="center"
						gap="4"
						justify="center"
						wrap="wrap"
						className={classNames({ [styles['text-action-container']]: isResume })}
					>
						<Text variant={isResume ? 'body3-accent' : 'body2'} color="purple-700" isNoWrap>
							{isResume
								? tResume(Resume.FILE_LOADER_RESUME_LINK)
								: tTranslation(Translation.FILE_LOADER_LINK)}
						</Text>
						<Text variant={isResume ? 'body3-accent' : 'body2'} color="black-500" isNoWrap>
							{`${
								isResume
									? tResume(Resume.FILE_LOADER_RESUME_TEXT)
									: tTranslation(Translation.FILE_LOADER_TEXT)
							} 
							${fileTypeText}`}
						</Text>
					</Flex>
					<Text
						variant={isResume ? 'body2-accent' : 'body1'}
						color={isResume ? 'black-400' : 'black-300'}
						className={classNames({
							[styles['resume-text-extension-container']]: isResume,
							[styles['resume-text-extension-container-mobile']]: isMobileS,
						})}
					>
						{extensionsText}
						{maxFileMBSize &&
							(isResume
								? ` • ${tResume(Resume.FILE_LOADER_RESUME_LIMIT, { maxFileMBSize })}`
								: ` (${tTranslation(Translation.FILE_LOADER_LIMIT, { maxFileMBSize })})`)}
					</Text>
					{isResume && (
						<Flex align="center" gap="8" justify="center">
							<Icon icon="lock" color="black-500" className={styles['resume-icon-description']} />
							<Text
								variant="body3-accent"
								color="black-500"
								className={styles['resume-text-description']}
							>
								{tResume(Resume.FILE_LOADER_RESUME_DESCRIPTION)}
							</Text>
						</Flex>
					)}
				</>
			)}
			<input
				type="file"
				accept={accept}
				ref={uploaderRef}
				onChange={handleChange}
				multiple={multiply}
				className={styles['file-input']}
				disabled={disabled}
			/>
		</Flex>
	);
};
