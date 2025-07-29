import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Media } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { mediaLinks } from '../../model/constants/media';
import { MediaLinkItem } from '../MediaLinkItem/MediaLinkItem';

import styles from './MediaLinksList.module.css';

export const MediaLinksList = () => {
	const { t } = useTranslation(i18Namespace.media);
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap="12">
			<Text variant={isMobile ? 'body5-accent' : 'head3'}>{t(Media.MEDIA_CHANNELS_TITLE)}</Text>
			<Text variant="body3" className={styles['description']}>
				{t(Media.MEDIA_CHANNELS_DESCRIPTION)}
			</Text>
			<ul className={styles['links-list']}>
				{mediaLinks.map((channel) => (
					<MediaLinkItem channel={channel} key={channel.title} />
				))}
			</ul>
		</Flex>
	);
};
