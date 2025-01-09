import { useTranslation } from 'react-i18next';

import Megaphone from '@/shared/assets/icons/Megaphone.svg';
import YeaHubCommunity from '@/shared/assets/icons/YeaHubCommunity.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Main } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './SubscribeToMedia.module.css';

export const SubscribeToMedia = () => {
	const { t } = useTranslation([i18Namespace.main]);

	return (
		<Card className={styles.card} withOutsideShadow title={t(Main.SUBSCRIBE_MEDIA_TITLE)}>
			<Flex direction="column" gap="16">
				<Flex direction="column" gap="8">
					<Text variant="body3" color="black-700">
						{t(Main.SUBSCRIBE_MEDIA_DESCRIPTION)}
					</Text>
				</Flex>
				<div className={styles.wrapper}>
					<Flex gap="8" className={styles['yeahub-container']}>
						<Megaphone className={styles.icon} />
						<span className={styles['media-wrapper']}>
							<a href="https://t.me/yeahub" target="_blank" rel="noreferrer">
								<Text color="purple-700" variant="body3">
									{t(Main.SUBSCRIBE_MEDIA_YEAHUB_TITLE)}:{' '}
								</Text>
							</a>
							<Text variant="body3" color="black-700">
								{t(Main.SUBSCRIBE_MEDIA_YEAHUB_DESCRIPTION)}
							</Text>
						</span>
					</Flex>
					<Flex gap="8" className={styles['yeahub-community-container']}>
						<YeaHubCommunity className={styles.icon} />
						<span className={styles['media-wrapper']}>
							<a href="https://t.me/yeahub_community" target="_blank" rel="noreferrer">
								<Text color="purple-700" variant="body3">
									{t(Main.SUBSCRIBE_MEDIA_YEAHUB_COMMUNITY_TITLE)}:{' '}
								</Text>
							</a>
							<Text variant="body3" color="black-700">
								{t(Main.SUBSCRIBE_MEDIA_YEAHUB_COMMUNITY_DESCRIPTION)}
							</Text>
						</span>
					</Flex>
				</div>
			</Flex>
		</Card>
	);
};
