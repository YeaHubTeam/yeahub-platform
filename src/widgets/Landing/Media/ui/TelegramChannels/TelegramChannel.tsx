import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Media as MediaTranslation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { MediaWithImage } from '@/entities/media';

import styles from './TelegramChannels.module.css';

interface TelegramChannelProps {
	channel: MediaWithImage;
}

export const TelegramChannel = ({ channel }: TelegramChannelProps) => {
	const { t } = useTranslation(i18Namespace.media);

	return (
		<Flex justify="between" className={styles['item']} align="center">
			<Flex gap="12" align="start" className={styles['content']}>
				{channel.image ? (
					<div className={styles['svg-wrapper']}>{<channel.image />}</div>
				) : (
					<div className={styles['avatar']}></div>
				)}
				<Flex direction="column" gap="6">
					<Text variant="body3-strong">{channel.title}</Text>
					<Text variant="body3">{t(MediaTranslation.TELEGRAM_DESCRIPTION)}</Text>
				</Flex>
			</Flex>

			<Link to={channel.link} target="_blank" rel="noopener noreferrer" className={styles['link']}>
				<Button variant="outline" className={styles['button']} size="medium">
					<Text variant="body3-strong">{t(MediaTranslation.TELEGRAM_SUBSCRIBE)}</Text>
				</Button>
			</Link>
		</Flex>
	);
};
