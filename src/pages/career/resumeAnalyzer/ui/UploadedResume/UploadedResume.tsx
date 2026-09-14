import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { i18Namespace, Resume } from '@/shared/config';
import { useAppDispatch } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Text } from '@/shared/ui/Text';

import { getSpecializationId } from '@/entities/profile';

import { useResumeAnalyzeByPortraitMutation } from '../../api/resumeAnalyzeApi';
import { useGetUploadedFileDate } from '../../model/hooks/useGetUploadedFileDate';
import {
	getResumeFileName,
	getResumeUploadedAt,
} from '../../model/selectors/resumeAnalyzerPageSelectors';
import { resumeAnalyzerPageActions } from '../../model/slices/resumeAnalyzerPageSlice';

import { UploadedFileIcon } from './UploadedFileIcon/UploadedFileIcon';
import styles from './UploadedResume.module.css';

export interface UploadedResumeProps {
	file: FormData;
	setFile: (file: FormData | null) => void;
}

export const UploadedResume = ({ file, setFile }: UploadedResumeProps) => {
	const dispatch = useAppDispatch();
	const fileName = useSelector(getResumeFileName);
	const uploadedAt = useSelector(getResumeUploadedAt);
	const formattedDate = useGetUploadedFileDate(uploadedAt);
	const { t } = useTranslation(i18Namespace.resume);
	const specializationId = useSelector(getSpecializationId);
	const [uploadResume, { isLoading }] = useResumeAnalyzeByPortraitMutation({
		fixedCacheKey: 'resume-analysis',
	});

	const onUploadResume = async () => {
		if (file) {
			await uploadResume({ specializationId, file }).unwrap();
		}
	};
	const onResetAnalyzerState = () => {
		setFile(null);
		dispatch(resumeAnalyzerPageActions.resetResumeAnalyzerState());
	};

	return (
		<Flex direction="column" gap="20" className={styles['uploaded-file-wrapper']}>
			<Card withOutsideShadow>
				<Flex justify="between">
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
					<IconButton
						icon={<Icon icon="trashOutline" size={20} />}
						variant="tertiary"
						size="small"
						className={styles['delete-button']}
						onClick={onResetAnalyzerState}
					/>
				</Flex>
			</Card>
			<Button
				variant="primary"
				size="large"
				disabled={isLoading}
				onClick={onUploadResume}
				className={styles['upload-button']}
			>
				{t(Resume.FILE_UPLOADED_RESUME_CHECK)}
			</Button>
		</Flex>
	);
};
