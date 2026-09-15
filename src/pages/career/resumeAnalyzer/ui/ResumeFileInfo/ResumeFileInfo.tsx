import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { i18Namespace, Resume } from '@/shared/config';
import { useGetDateWithLocale } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import {
	getResumeFileName,
	getResumeUploadedAt,
} from '../../model/selectors/resumeAnalyzerPageSelectors';

import styles from './ResumeFileInfo.module.css';
import { UploadedFileIcon } from './UploadedFileIcon/UploadedFileIcon';

export const ResumeFileInfo = () => {
	const { t } = useTranslation(i18Namespace.resume);
	const fileName = useSelector(getResumeFileName);
	const uploadedAt = useSelector(getResumeUploadedAt);
	const formattedDate = useGetDateWithLocale(uploadedAt);
	return (
		<Flex gap="12">
			<UploadedFileIcon />
			<Flex gap="8" direction="column" align="start">
				<Text variant="body2-accent">{t(Resume.FILE_UPLOADED_RESUME_TITLE)}</Text>
				<Text variant="body3-strong" className={styles['file-name']}>
					{fileName}
				</Text>
				<Text variant="body3-accent" color="black-500">
					{t(Resume.FILE_UPLOADED_RESUME_UPLOADED_AT, { uploadedAt: formattedDate })}
				</Text>
			</Flex>
		</Flex>
	);
};
