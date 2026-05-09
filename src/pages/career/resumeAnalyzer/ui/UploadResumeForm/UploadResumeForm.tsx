import { useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { FileLoader, Accept, Extension } from '@/shared/ui/FileLoader';
import { Flex } from '@/shared/ui/Flex';
import { FormField } from '@/shared/ui/FormField';
import { toast } from '@/shared/ui/Toast';

import { SpecializationSelect } from '@/entities/specialization';

interface UploadResumeFormProps {
	onSubmit: (data: { specializationId: number; file: FormData }) => void;
	isLoading: boolean;
}

export const UploadResumeForm = ({ onSubmit, isLoading }: UploadResumeFormProps) => {
	const [specialization, setSpecialization] = useState<number | null>(null);
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

	const onChangeSpecialization = (id: number | number[]) => {
		const specializationId = Array.isArray(id) ? id[0] : id;
		setSpecialization(specializationId);
	};

	const onUploadResume = () => {
		if (specialization && file) onSubmit({ specializationId: specialization, file: file });
	};

	return (
		<Flex direction="column" gap="20">
			<FormField label="Выберите специализацию">
				<SpecializationSelect value={specialization || 0} onChange={onChangeSpecialization} />
			</FormField>
			<FormField label="Загрузите резюме">
				<FileLoader
					disabled={!specialization || isLoading}
					accept={Accept.MS_WORD}
					fileTypeText="своё резюме"
					extensionsText={Extension.MS_WORD}
					onChange={handleUpload}
				/>
			</FormField>
			<Button
				variant="primary"
				disabled={!specialization || !file || isLoading}
				onClick={onUploadResume}
			>
				Проверить резюме
			</Button>
		</Flex>
	);
};
