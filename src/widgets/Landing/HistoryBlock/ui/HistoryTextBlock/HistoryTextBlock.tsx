import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './HistoryTextBlock.module.css';

export const HistoryTextBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" justify="center" className={styles['text-block']}>
			<Flex direction="column" className={styles['content']}>
				<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
					{t(Landing.HISTORY_TITLE)}
				</Text>
				<Text variant="body3">{t(Landing.HISTORY_SUBTITLE)}</Text>
			</Flex>
		</Flex>
	);
};
