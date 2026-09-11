import { useTranslation } from 'react-i18next';

import { i18Namespace, Resume, Translation } from '@/shared/config';
import { useAppDispatch } from '@/shared/libs';
import { Accept, Extension, FileLoader } from '@/shared/ui/FileLoader';
import { toast } from '@/shared/ui/Toast';

import { resumeAnalyzerPageActions } from '../../model/slices/resumeAnalyzerPageSlice';

import styles from './ResumeFileLoader.module.css';

export const ResumeFileLoader = ({ setFile }: { setFile: (file: FormData | null) => void }) => {
	const dispatch = useAppDispatch();
	const { t: tTranslation } = useTranslation(i18Namespace.translation);
	const { t: tResume } = useTranslation(i18Namespace.resume);

	const onUploadResume = ([file]: File[]) => {
		const formData = new FormData();
		formData.append('file', file);
		setFile(formData);
		dispatch(resumeAnalyzerPageActions.setFileName(file.name));
		if (formData.get('file')) {
			dispatch(resumeAnalyzerPageActions.setUploadedAt(new Date().toISOString()));
			toast.success(tResume(Resume.FILE_UPLOADED_RESUME_UPLOAD_SUCCESS));
		} else {
			toast.error(tResume(Resume.FILE_UPLOADED_RESUME_UPLOAD_FAILED));
		}
	};

	return (
		<FileLoader
			className={styles['file-loader-wrapper']}
			accept={Accept.MS_WORD}
			fileTypeText={tTranslation(Translation.FILE_LOADER_TYPES_RESUME)}
			extensionsText={Extension.MS_WORD}
			onChange={onUploadResume}
			contentVariant="resume"
			maxFileMBSize={10}
		/>
	);
};
