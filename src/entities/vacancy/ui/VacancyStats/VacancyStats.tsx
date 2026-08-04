import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { VacancyPreparation } from '@/entities/vacancy';

import { VacancyStatItem } from '../VacancyStatItem/VacancyStatItem';

import styles from './VacancyStats.module.css';

type VacancyStatsProps = {
	preparation: VacancyPreparation;
};

export const VacancyStats = ({ preparation }: VacancyStatsProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const { collectionsCount, questionsCount, tasksCount } = preparation;

	const hasResource = collectionsCount > 0 || questionsCount > 0 || tasksCount > 0;
	if (!hasResource) {
		return null;
	}

	return (
		<Flex gap="100" maxWidth className={styles['stats-block']}>
			<Flex gap="14" align="center">
				<Icon icon="target" color="purple-700" size={36} className={styles.icon} />
				<Text variant="body3-accent" isNoWrap>
					{t(Vacancies.STATS_TITLE)}
				</Text>
			</Flex>

			<Flex maxWidth className={styles['stats-list']}>
				<VacancyStatItem
					value={collectionsCount}
					label={t(Vacancies.STATS_INTERVIEWS, { count: collectionsCount })}
				/>
				<VacancyStatItem
					value={tasksCount}
					label={t(Vacancies.STATS_TASKS, { count: tasksCount })}
				/>
				<VacancyStatItem
					value={questionsCount}
					label={t(Vacancies.STATS_QUESTIONS, { count: questionsCount })}
				/>
			</Flex>
		</Flex>
	);
};
