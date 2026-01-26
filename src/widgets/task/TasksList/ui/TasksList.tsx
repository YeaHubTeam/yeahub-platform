import classnames from 'classnames';

import type { TaskListItem } from '@/entities/task';
import { TaskCard } from '@/entities/task';

import styles from './TasksList.module.css';

interface TasksListProps {
	tasks: TaskListItem[];
	className?: string;
}

export const TasksList = ({ tasks, className }: TasksListProps) => {
	return (
		<div className={classnames(styles.list, className)}>
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
};
