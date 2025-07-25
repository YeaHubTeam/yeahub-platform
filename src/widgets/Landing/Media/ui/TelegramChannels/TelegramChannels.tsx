import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Media } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { mediaLinks } from '@/entities/media';

import { TelegramChannel } from './TelegramChannel';
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
			<div className={styles['list']}>
				{mediaLinks.map((channel) => (
					<TelegramChannel channel={channel} key={channel.title} />
				))}
			</div>
		</Flex>
	);
};
