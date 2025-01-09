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
		<Card className={styles.card}>
			<Flex direction="column" gap="16">
				<Flex direction="column" gap="8">
					<Text variant="body5-strong" color="black-900">
						{t(Main.SUBSCRIBE_MEDIA_TITLE)}
					</Text>
					<Text variant="body3" color="black-700">
						{t(Main.SUBSCRIBE_MEDIA_DESCRIPTION)}
					</Text>
				</Flex>
				<Flex gap="16" justify="between">
					<Flex gap="8">
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
					<Flex gap="8">
						<YeaHubCommunity className={styles.icon} />
						<span className={styles['media-wrapper']}>
							<a href="https://t.me/yeahub_community" target="_blank" rel="noreferrer">
								<Text color="purple-700" variant="body3">
									YeaHub Community:{' '}
								</Text>
							</a>
							<Text variant="body3" color="black-700">
								Общение, обмен опытом и поддержка единомышленников
							</Text>
						</span>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};
