import { generatePath, Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ProgrammingLanguageList } from '@/entities/programmingLanguage/@x/task';

import { Task } from '../../model/types/task';
import { TaskCategoryChip } from '../TaskCategoryChip/TaskCategoryChip';
import { TaskDifficultyChip } from '../TaskDifficultyChip/TaskDifficultyChip';
import { TaskStatusChip } from '../TaskStatusChip/TaskStatusChip';

import styles from './TaskCard.module.css';

type TaskCardProps = {
	task: Task;
	className?: string;
};

export const TaskCard = ({ task, className }: TaskCardProps) => {
	const { id, name, difficulty, mainCategory, status, supportedLanguages } = task;

	const taskPath = generatePath(ROUTES.liveCoding.tasks.detail.page, { taskId: id });

	return (
		<Link to={taskPath} className={className}>
			<Card withOutsideShadow className={styles.content}>
				<Flex direction="column" gap="20">
					<Flex justify="between" align="start" gap="16">
						<Text variant="body4" maxRows={2}>
							{name}
						</Text>
					</Flex>

					<Flex align="center" gap="10">
						<TaskStatusChip status={status} size="medium" />
						<TaskDifficultyChip difficulty={difficulty} />
						<ProgrammingLanguageList languages={supportedLanguages} />
						<TaskCategoryChip category={mainCategory} />
					</Flex>
				</Flex>
			</Card>
		</Link>
	);
};
