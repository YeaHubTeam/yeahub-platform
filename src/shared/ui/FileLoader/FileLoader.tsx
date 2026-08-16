/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames';
import { DragEvent, RefObject, useRef, useState } from 'react';

import { useDragAndDrop } from '@/shared/libs';
import {
	FileLoaderDefaultContent,
	FileLoaderResumeContent,
} from '@/shared/ui/FileLoader/FileLoaderContent';
import { Flex } from '@/shared/ui/Flex';

import style from './FileLoader.module.css';
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
	contentVariant?: 'default' | 'resume';
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
	contentVariant = 'default',
}: FileLoaderProps) => {
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);

	const [files, setFiles] = useState<globalThis.File[]>([]);
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
				style['file-upload-container'],
				{
					[style.active]: isDragActive,
					[style.disabled]: disabled,
					[style['content-resume']]: contentVariant === 'resume',
				},
				className,
			)}
		>
			{isDragDropEnabled && (
				<>
					{contentVariant === 'default' && (
						<FileLoaderDefaultContent
							fileTypeText={fileTypeText}
							maxFileMBSize={maxFileMBSize}
							extensionsText={extensionsText}
						/>
					)}
					{contentVariant === 'resume' && (
						<FileLoaderResumeContent
							fileTypeText={fileTypeText}
							maxFileMBSize={maxFileMBSize}
							extensionsText={extensionsText}
						/>
					)}
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
