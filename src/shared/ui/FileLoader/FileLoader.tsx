/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames';
import { DragEvent, RefObject, useRef, useState } from 'react';

import Gallery from '@/shared/assets/images/Gallery.png';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import style from './FileLoader.module.css';
import { Accept, Extension } from './model/types/types';

interface FileLoaderProps {
	accept: Accept;
	multyple?: boolean;
	maxFileMBSize: number;
	fileTypeText: string;
	extensionsText: Extension;
	onChange: (files: globalThis.File[]) => void;
}

export const FileLoader = ({
	accept,
	fileTypeText,
	maxFileMBSize,
	extensionsText,
	multyple = false,
	onChange,
}: FileLoaderProps) => {
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);

	const [files, setFiles] = useState<globalThis.File[]>([]);

	const { t } = useI18nHelpers();

	const { isDragActive, onDragLeave, handleUploader, onDragOverAndEnter, handleIsDragActive } =
		useDragAndDrop(uploaderRef);

	const handleChange = () => {
		if (uploaderRef.current) {
			const refFiles = uploaderRef?.current.files;

			if (refFiles && refFiles.length > 0) {
				const file = Array.from(refFiles);

				if (!multyple) {
					setFiles([file[0]]);
					onChange([file[0]]);
					return;
				}

				const updatedList = [...files, ...file];
				setFiles(updatedList);
				onChange(updatedList);
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
			className={classNames(style['file-upload-container'], { [style.active]: isDragActive })}
		>
			<div className={style['svg-wrapper']}>
				<img src={Gallery} alt="gallery-icon" />
			</div>

			<p>
				<span>{t(Translation.FILELOADER_LINKTEXT)}</span> {t(Translation.FILELOADER_TEXT)}{' '}
				{fileTypeText}
			</p>

			<p className={style['extension-descriptions']}>
				{extensionsText} ({t(Translation.FILELOADER_LIMIT, { maxFileMBSize })})
			</p>

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
