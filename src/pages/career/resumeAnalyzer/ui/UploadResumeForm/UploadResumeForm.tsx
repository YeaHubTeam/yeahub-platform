import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { i18Namespace, Translation } from '@/shared/config';
import { FileLoader, Accept, Extension } from '@/shared/ui/FileLoader';
import { toast } from '@/shared/ui/Toast';

import { getSpecializationId } from '@/entities/profile';

import { useGetUploadedFileDate } from '../../model/hooks/useGetUploadedFileDate';
import { UploadedResume } from '../UploadedResume/UploadedResume';

import styles from './UploadResumeForm.module.css';

interface UploadResumeFormProps {
	onSubmit: (data: { specializationId: number; file: FormData }) => void;
	isLoading: boolean;
}

export const UploadResumeForm = ({ onSubmit, isLoading }: UploadResumeFormProps) => {
	const [file, setFile] = useState<FormData | null>(null);
	const [fileName, setFileName] = useState<string>('');

	const [uploadedAt, setUploadedAt] = useState<string | null>(null);
	const formattedDate = useGetUploadedFileDate(uploadedAt);

	const { t } = useTranslation(i18Namespace.translation);
	const specializationId = useSelector(getSpecializationId);

	const handleUpload = ([file]: File[]) => {
		const formData = new FormData();
		formData.append('file', file);
		setFile(formData);
		setFileName(file.name);
		if (formData.get('file')) {
			setUploadedAt(new Date().toISOString());
			toast.success(t(Translation.FILE_UPLOADED_RESUME_UPLOAD_SUCCESS));
		} else {
			toast.error(t(Translation.FILE_UPLOADED_RESUME_UPLOAD_FAILED));
		}
	};

	const onUploadResume = () => {
		if (file) onSubmit({ specializationId, file: file });
	};

	const resetResume = () => {
		setFile(null);
		setFileName('');
		setUploadedAt(null);
	};

	return (
		<>
			{!file ? (
				<FileLoader
					className={styles['file-loader-wrapper']}
					accept={Accept.MS_WORD}
					fileTypeText="резюме"
					extensionsText={Extension.MS_WORD}
					onChange={handleUpload}
					contentVariant="resume"
					maxFileMBSize={10}
				/>
			) : (
				<UploadedResume
					fileName={fileName}
					isLoading={isLoading}
					onUploadResume={onUploadResume}
					uploadedAt={formattedDate}
					onDeleteResume={resetResume}
				/>
			)}
		</>
	);
};
