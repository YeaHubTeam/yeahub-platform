import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config';
import { i18Namespace } from '@/shared/config';
import { Extension } from '@/shared/ui/FileLoader';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './FileLoaderResumeContent.module.css';
import { FileLoaderResumeContentBorder } from './FileLoaderResumeContentBorder';

export interface FileLoaderResumeContentProps {
	maxFileMBSize?: number;
	fileTypeText: string;
	extensionsText: Extension;
}

export const FileLoaderResumeContent = ({
	maxFileMBSize,
	extensionsText,
	fileTypeText,
}: FileLoaderResumeContentProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	return (
		<Flex direction="column" justify="center" align="center" className={styles.wrapper}>
			<FileLoaderResumeContentBorder className={styles['border-svg']} />
			<Icon className={styles['icon-loader']} icon="downloadFile" color="purple-700" size={46} />
			<Flex
				align="center"
				gap="4"
				justify="center"
				wrap="wrap"
				className={styles['text-action-container']}
			>
				<Text variant="body3-accent" color="purple-700" isNoWrap>
					{t(Translation.FILE_LOADER_RESUME_LINK)}
				</Text>
				<Text variant="body3-accent" color="black-500" isNoWrap>
					{t(Translation.FILE_LOADER_RESUME_TEXT)} {fileTypeText}
				</Text>
			</Flex>
			<Text variant="body2-accent" color="black-400" className={styles['text-extension-container']}>
				{extensionsText}
				{maxFileMBSize && ` • ${t(Translation.FILE_LOADER_RESUME_LIMIT, { maxFileMBSize })}`}
			</Text>
			<Flex align="center" gap="8" justify="center">
				<Icon icon="lock" color="black-500" className={styles['icon-description']} />
				<Text variant="body3-accent" color="black-500" className={styles['text-description']}>
					{t(Translation.FILE_LOADER_RESUME_DESCRIPTION)}
				</Text>
			</Flex>
		</Flex>
	);
};
