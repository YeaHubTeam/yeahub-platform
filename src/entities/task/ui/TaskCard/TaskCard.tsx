import { generatePath, Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TaskDifficultyChip } from '@/entities/task/ui/TaskDifficultyChip/TaskDifficultyChip';

import { TaskListItem } from '../../model/types/task';

import styles from './TaskCard.module.css';

type TaskCardProps = {
	task: TaskListItem;
	className?: string;
};

export const TaskCard = ({ task, className }: TaskCardProps) => {
	const { id, name, difficulty } = task;

	const taskPath = generatePath(ROUTES.liveCoding.tasks.detail.page, { taskId: id });

	return (
		<Link to={taskPath} className={className}>
			<Card withOutsideShadow className={styles.content}>
				<Flex direction="column" gap="20">
					<Flex justify="between" align="start" gap="16">
						<Text variant="body4" maxRows={2}>
							{name}
						</Text>

						{/*TODO: Add Like Button + logic*/}
						{/*<Text variant="body2">Like</Text>*/}
					</Flex>

					<Flex align="center" gap="10">
						<TaskDifficultyChip difficulty={difficulty} />
					</Flex>
				</Flex>
			</Card>
		</Link>
	);
};
