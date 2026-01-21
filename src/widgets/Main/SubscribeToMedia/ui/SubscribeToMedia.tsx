import { useTranslation } from 'react-i18next';

import { i18Namespace, Main } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './SubscribeToMedia.module.css';

export const SubscribeToMedia = () => {
	const { t } = useTranslation([i18Namespace.main]);

	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="16">
				<Text variant="body5-strong">{t(Main.SUBSCRIBE_MEDIA_TITLE)}</Text>
				<Flex direction="column" gap="8">
					<Text variant="body2-accent" color="black-600">
						{t(Main.SUBSCRIBE_MEDIA_DESCRIPTION)}
					</Text>
				</Flex>
				<div className={styles.wrapper}>
					<Flex gap="8" className={styles['yeahub-container']}>
						<Icon icon="megaphone" size={20} color="purple-700" aria-hidden="true" />
						<span className={styles['media-wrapper']}>
							<a href="https://t.me/yeahub" target="_blank" rel="noreferrer">
								<Text color="purple-700" variant="body2">
									{t(Main.SUBSCRIBE_MEDIA_YEAHUB_TITLE)}:{' '}
								</Text>
							</a>
							<Text variant="body2" color="black-700">
								{t(Main.SUBSCRIBE_MEDIA_YEAHUB_DESCRIPTION)}
							</Text>
						</span>
					</Flex>
					<Flex gap="8" className={styles['yeahub-community-container']}>
						<Icon icon="yeaHubCommunity" size={20} color="purple-700" aria-hidden="true" />
						<span className={styles['media-wrapper']}>
							<a href="https://t.me/yeahub_community" target="_blank" rel="noreferrer">
								<Text color="purple-700" variant="body2">
									{t(Main.SUBSCRIBE_MEDIA_YEAHUB_COMMUNITY_TITLE)}:{' '}
								</Text>
							</a>
							<Text variant="body2" color="black-700">
								{t(Main.SUBSCRIBE_MEDIA_YEAHUB_COMMUNITY_DESCRIPTION)}
							</Text>
						</span>
					</Flex>
				</div>
			</Flex>
		</Card>
	);
};
