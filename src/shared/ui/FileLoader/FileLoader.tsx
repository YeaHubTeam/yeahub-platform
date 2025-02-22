/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames';
import { DragEvent, RefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Gallery from '@/shared/assets/images/Gallery.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';

import style from './FileLoader.module.css';
import { Accept, Extension } from './model/types/types';

interface FileLoaderProps {
	accept: Accept;
	multyple?: boolean;
	maxFileMBSize?: number;
	fileTypeText: string;
	className?: string;
	extensionsText: Extension;
	onChange: (files: globalThis.File[]) => void;
	isDragDropEnabled?: boolean;
}

export const FileLoader = ({
	className,
	accept,
	fileTypeText,
	maxFileMBSize,
	extensionsText,
	multyple = false,
	onChange,
	isDragDropEnabled = true,
}: FileLoaderProps) => {
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);

	const [files, setFiles] = useState<globalThis.File[]>([]);

	const { t } = useTranslation(i18Namespace.translation);

	const { isDragActive, onDragLeave, handleUploader, onDragOverAndEnter, handleIsDragActive } =
		useDragAndDrop(uploaderRef);

	const clearInputState = (input: HTMLInputElement) => {
		input.value = '';
	};

	const handleChange = () => {
		if (uploaderRef.current) {
			const refFiles = uploaderRef?.current.files;
			if (refFiles && refFiles.length > 0) {
				const file = Array.from(refFiles);

				if (!multyple) {
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
		e.preventDefault();
		const transferFiles = e.dataTransfer.files;
		handleIsDragActive(false);

		if (transferFiles && transferFiles.length > 0) {
			const file = Array.from(transferFiles);

			if (!multyple) {
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
		<div
			tabIndex={0}
			role={'button'}
			onDrop={onDrop}
			onClick={handleUploader}
			onDragLeave={onDragLeave}
			onDragOver={onDragOverAndEnter}
			onDragEnter={onDragOverAndEnter}
			className={classNames(
				style['file-upload-container'],
				{ [style.active]: isDragActive },
				className,
			)}
		>
			{isDragDropEnabled && (
				<>
					<div>
						<img src={Gallery} alt={t(Translation.FILE_LOADER_TYPES_PHOTO)} />
					</div>

					<p>
						<span>{t(Translation.FILE_LOADER_LINK)}</span> {t(Translation.FILE_LOADER_TEXT)}{' '}
						{fileTypeText}
					</p>

					<p className={style['extension-descriptions']}>
						{extensionsText}
						{maxFileMBSize && ` (${t(Translation.FILE_LOADER_LIMIT, { maxFileMBSize })})`}
					</p>
				</>
			)}

			<input
				type="file"
				accept={accept}
				ref={uploaderRef}
				onChange={handleChange}
				multiple={multyple}
				className={style['file-input']}
			/>
		</div>
	);
};
