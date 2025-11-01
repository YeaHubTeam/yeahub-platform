import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Learning } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './AdvantagesBlock.module.css';
import { AdvantagesList } from './AdvantagesList/AdvantagesList';

export const AdvantagesBlock = () => {
	const { t } = useTranslation(i18Namespace.learning);
	return (
		<>
			<Flex direction="column" gap={'8'} className={styles.process}>
				<Text variant={'head2'}>{t(Learning.BANNER_TITLE)}</Text>
				<Text variant={'body3'} className={styles.description}>
					{t(Learning.BANNER_DESCRIPTION)}
				</Text>
			</Flex>
			<AdvantagesList />
		</>
	);
};
