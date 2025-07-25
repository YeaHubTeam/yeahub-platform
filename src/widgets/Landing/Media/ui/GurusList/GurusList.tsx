import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Media } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { gurus, GurusItem } from '@/entities/guru';

import styles from './GurusList.module.css';

export const GurusList = () => {
	const { t } = useTranslation(i18Namespace.media);
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap="12">
			<Text variant={isMobile ? 'body5-accent' : 'head3'}>{t(Media.MEDIA_EXPERTS_TITLE)}</Text>
			<Text variant="body3">{t(Media.MEDIA_EXPERTS_DESCRIPTION)}</Text>
			<div className={styles.container}>
				{gurus.map((guru) => (
					<GurusItem
						guru={guru}
						avatarSize={53}
						className={styles.guru}
						key={guru.title}
						description={t(Media.GURU_DESCRIPTION)}
					/>
				))}
			</div>
		</Flex>
	);
};
