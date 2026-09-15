import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { i18Namespace, Resume } from '@/shared/config';
import { useAppDispatch } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { getSpecializationId } from '@/entities/profile';

import { useResumeAnalyzeByPortraitMutation } from '../../api/resumeAnalyzeApi';
import { resumeAnalyzerPageActions } from '../../model/slices/resumeAnalyzerPageSlice';
import { ResumeFileInfo } from '../ResumeFileInfo';

import styles from './UploadedResume.module.css';

export interface UploadedResumeProps {
	file: FormData;
	setFile: (file: FormData | null) => void;
}

export const UploadedResume = ({ file, setFile }: UploadedResumeProps) => {
	const dispatch = useAppDispatch();
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
					<ResumeFileInfo />
					<IconButton
						icon={<Icon icon="trashOutline" size={20} />}
						variant="tertiary"
						size="small"
						className={styles['delete-button']}
						onClick={onResetAnalyzerState}
						disabled={isLoading}
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
