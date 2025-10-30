import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TopStat } from '../../model/types/question';

import styles from './MostDifficultQuestionsMobile.module.css';

type MostDifficultQuestionsMobile = Omit<TopStat, 'questionId'>;

export const MostDifficultQuestionMobile = ({
	title,
	stat,
	answersCount,
}: MostDifficultQuestionsMobile) => {
	const { t } = useTranslation(i18Namespace.analytics);

	return (
		<Card className={styles.card}>
			<Flex direction="column" gap="12">
				<Text variant="body3-accent">{title}</Text>
				<Flex justify="between">
					<Text variant="body3-accent">{t(Analytics.MOST_DIFFICULT_QUESTIONS_COLUMNS_STAT)}</Text>
					<Text variant="body3-accent">{Math.round(stat)}%</Text>
				</Flex>
				<Flex justify="between">
					<Text variant="body3-accent">
						{t(Analytics.MOST_DIFFICULT_QUESTIONS_COLUMNS_ANSWERS_COUNT)}
					</Text>
					<Text variant="body3-accent">{answersCount}</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
