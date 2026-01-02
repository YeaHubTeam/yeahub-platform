import { useTranslation } from 'react-i18next';

import { i18Namespace, Media } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { MediaLinksList } from '@/entities/socialMedia';

import styles from './TelegramChannels.module.css';

export const TelegramChannels = () => {
	const { t } = useTranslation(i18Namespace.media);
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap="12">
			<Text variant={isMobile ? 'body5-accent' : 'head3'}>{t(Media.MEDIA_CHANNELS_TITLE)}</Text>
			<Text variant="body3" className={styles['description']}>
				{t(Media.MEDIA_CHANNELS_DESCRIPTION)}
			</Text>
			<MediaLinksList />
		</Flex>
	);
};
