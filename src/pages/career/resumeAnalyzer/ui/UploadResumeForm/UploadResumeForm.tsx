import { useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { FileLoader, Accept, Extension } from '@/shared/ui/FileLoader';
import { Flex } from '@/shared/ui/Flex';
import { toast } from '@/shared/ui/Toast';

import styles from './UploadResumeForm.module.css';

interface UploadResumeFormProps {
	onSubmit: (data: { specializationId: number; file: FormData }) => void;
	isLoading: boolean;
}

export const UploadResumeForm = ({ onSubmit, isLoading }: UploadResumeFormProps) => {
	const [file, setFile] = useState<FormData | null>(null);

	const handleUpload = ([file]: File[]) => {
		const formData = new FormData();
		formData.append('file', file);
		setFile(formData);
		if (formData.get('file')) {
			toast.success('Резюме успешно загружено');
		} else {
			toast.error('Не удалось загрузить резюме');
		}
	};

	const onUploadResume = () => {
		if (file) onSubmit({ specializationId: 1, file: file });
	};

	return (
		<>
			<Flex direction="column" gap="20">
				<FileLoader
					className={styles['file-loader-wrapper']}
					accept={Accept.MS_WORD}
					fileTypeText="резюме"
					extensionsText={Extension.MS_WORD}
					onChange={handleUpload}
					contentVariant="resume"
					maxFileMBSize={10}
				/>
				<Button variant="primary" disabled={!file || isLoading} onClick={onUploadResume}>
					Проверить резюме
				</Button>
			</Flex>
		</>
	);
};
