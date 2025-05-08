import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import styles from './HistoryTextBlock.module.css';

export const HistoryTextBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Flex direction="column" justify="center" className={styles['text-block']}>
			<Flex direction="column" className={styles['content']}>
				<h2>{t(Landing.HISTORY_TITLE)}</h2>
				<p>{t(Landing.HISTORY_SUBTITLE)}</p>
			</Flex>
		</Flex>
	);
};
