import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, ROUTES, Vacancies } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { Task, TaskCard } from '@/entities/task';

import styles from './CompanyTasks.module.css';

interface CompanyTasksProps {
	companyTitle: string;
	tasks: Task[];
}

export const CompanyTasks = ({ companyTitle, tasks }: CompanyTasksProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	return (
		<Flex gap="20" direction="column" className={styles.container}>
			<Flex direction="row" justify="between">
				<Text variant="body6" color="black-800">
					{t(Vacancies.TASKS_SECTION_TITLE, {
						company: companyTitle,
					})}
				</Text>
				<Link to={ROUTES.tasks.page} className={styles.link}>
					{t(Vacancies.TASKS_SECTION_LINK)}
					<Icon icon="arrowRight" size={24} />
				</Link>
			</Flex>
			{tasks?.slice(0, 3).map((task) => <TaskCard key={task.id} task={task} />)}
		</Flex>
	);
};
