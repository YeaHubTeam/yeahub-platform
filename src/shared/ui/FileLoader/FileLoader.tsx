/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames';
import { DragEvent, RefObject, useRef, useState } from 'react';

import Gallery from '@/shared/assets/images/Gallery.png';

import style from './FileLoader.module.css';
import { Accept, Extension, FileType } from './model/types/types';

interface FileLoaderProps {
	accept: Accept;
	maxFileMBSize: number;
	fileTypeText: FileType;
	extensionsText: Extension;
}

export const FileLoader = ({
	accept,
	fileTypeText,
	maxFileMBSize,
	extensionsText,
}: FileLoaderProps) => {
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);

	const [files, setFiles] = useState<File[]>([]);
	const [isDragActive, setIsDragActive] = useState<boolean>(false);

	const handleUploader = () => {
		if (uploaderRef.current) {
			uploaderRef.current.click();
		}
	};

	const handleChange = () => {
		if (uploaderRef.current) {
			const fs = uploaderRef?.current.files;

			if (fs && fs.length > 0) {
				setFiles((state) => [...state, ...Array.from(fs)]);
			}
		}
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const fs = e.dataTransfer.files;
		setIsDragActive(false);

		if (fs && fs.length > 0) {
			setFiles((state) => [...state, ...Array.from(fs)]);
		}
	};

	const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragActive(false);
	};

	const onDragOverAndEnter = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragActive(true);
	};

	// FOR TESTING
	const deletePreview = (name: string) => {
		setFiles((state) => state.filter((el) => el.name !== name));
	};
	// console.log(files);
	//

	return (
		<>
			{/* FOR TESTING */}
			{files.length > 0 ? (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
					{files.map((file, i) => (
						<div key={i}>
							{file?.name}
							<div tabIndex={0} role="button" onClick={() => deletePreview(file.name)}>
								X
							</div>
						</div>
					))}
				</div>
			) : null}
			{/* // */}

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
					<span>Кликни для изменения</span> или перетащи сюда {fileTypeText}
				</p>
				<p className={style['extension-descriptions']}>
					{extensionsText} (не более {maxFileMBSize}мб)
				</p>

				<input
					type="file"
					accept={accept}
					ref={uploaderRef}
					onChange={handleChange}
					className={style['file-input']}
				/>
			</div>
		</>
	);
};
