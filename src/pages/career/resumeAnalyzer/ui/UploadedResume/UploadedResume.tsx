import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Text } from '@/shared/ui/Text';

import { UploadedFileIcon } from './UploadedFileIcon/UploadedFileIcon';
import styles from './UploadedResume.module.css';

export interface UploadedResumeProps {
	fileName: string;
	isLoading: boolean;
	onUploadResume: () => void;
	onDeleteResume: () => void;
	uploadedAt?: string | null;
}

export const UploadedResume = ({
	fileName,
	isLoading,
	onUploadResume,
	onDeleteResume,
	uploadedAt,
}: UploadedResumeProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	return (
		<Flex direction="column" gap="20" className={styles['uploaded-file-wrapper']}>
			<Card withOutsideShadow>
				<Flex justify="between">
					<Flex gap="12">
						<UploadedFileIcon />
						<Flex gap="8" direction="column" align="start">
							<Text variant="body2-accent">{t(Translation.FILE_UPLOADED_RESUME_TITLE)}</Text>
							<Text variant="body3-strong-compact" className={styles['file-name']}>
								{fileName}
							</Text>
							<Text variant="body3-accent" color="black-500">
								{t(Translation.FILE_UPLOADED_RESUME_UPLOADED_AT, { uploadedAt })}
							</Text>
						</Flex>
					</Flex>
					<IconButton
						icon={<Icon icon="trashOutline" size={20} />}
						variant="tertiary"
						size="small"
						className={styles['delete-button']}
						onClick={onDeleteResume}
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
				Проверить резюме
			</Button>
		</Flex>
	);
};
