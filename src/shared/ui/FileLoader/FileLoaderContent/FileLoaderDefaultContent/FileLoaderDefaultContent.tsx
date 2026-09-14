import React from 'react';
import { useTranslation } from 'react-i18next';

import Gallery from '@/shared/assets/images/gallery.avif';
import { Translation } from '@/shared/config';
import { i18Namespace } from '@/shared/config';
import { Extension } from '@/shared/ui/FileLoader';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

export interface FileLoaderDefaultContentProps {
	maxFileMBSize?: number;
	fileTypeText: string;
	extensionsText: Extension;
}

export const FileLoaderDefaultContent = ({
	maxFileMBSize,
	extensionsText,
	fileTypeText,
}: FileLoaderDefaultContentProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	return (
		<>
			<div>
				<img src={Gallery} alt={t(Translation.FILE_LOADER_TYPES_PHOTO)} loading="lazy" />
			</div>
			<Flex align="center" gap="4" justify="center" wrap="wrap">
				<Text variant="body2" color="purple-700" isNoWrap>
					{t(Translation.FILE_LOADER_LINK)}
				</Text>
				<Text variant="body2" color="black-500" isNoWrap>
					{t(Translation.FILE_LOADER_TEXT)} {fileTypeText}
				</Text>
			</Flex>
			<Text variant="body1" color="black-300">
				{extensionsText}
				{maxFileMBSize && ` (${t(Translation.FILE_LOADER_LIMIT, { maxFileMBSize })})`}
			</Text>
		</>
	);
};
