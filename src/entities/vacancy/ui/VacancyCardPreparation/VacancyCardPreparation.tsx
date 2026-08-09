import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { getVacancyKey } from '../../lib/getVacancyKey';
import type { VacancyPreparation } from '../../model/types/vacancy';

import styles from './VacancyCardPreparation.module.css';

interface VacancyCardPreparationProps {
	preparation: VacancyPreparation;
}

export const VacancyCardPreparation = ({ preparation }: VacancyCardPreparationProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const { collectionsCount, questionsCount, tasksCount } = preparation;

	const vacancyPreparationData = [
		{ count: questionsCount, type: 'questions' as const },
		{ count: tasksCount, type: 'tasks' as const },
		{ count: collectionsCount, type: 'collections' as const },
	];

	return (
		<Card
			withOutsideShadow
			classNameContent={styles.content}
			className={styles['preparation-block']}
		>
			<Flex gap="10" align="center">
				<Icon icon="referralsIcon" size={14} />
				{vacancyPreparationData
					.filter(({ count }) => count > 0)
					.map(({ count, type }) => (
						<Flex key={type} gap="10" align="center" className={styles.preparation}>
							<Text variant="body1-accent" className={styles['preparation-text']}>
								{t(getVacancyKey(count, type), { count })}
							</Text>
						</Flex>
					))}
			</Flex>
		</Card>
	);
};
