import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { VacancyAiProfile } from '@/entities/vacancy';

import styles from './VacancyTasks.module.css';

interface VacancyTasksProps {
	tasks: VacancyAiProfile['tasks'];
}

export const VacancyTasks = ({ tasks }: VacancyTasksProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	if (!tasks.length) return null;

	return (
		<Flex gap="20" direction="column">
			<Text variant="body3-strong" color="black-900">
				{t(Vacancies.TASKS_TITLE)}
			</Text>

			<Flex gap="12" direction="column" componentType="ul" className={styles['task-list']}>
				{tasks.map((task) => (
					<li key={task} className={styles.task}>
						<Text variant="body3-accent" color="black-900">
							{task}
						</Text>
					</li>
				))}
			</Flex>
		</Flex>
	);
};
