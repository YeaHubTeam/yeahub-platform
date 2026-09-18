import React from 'react';

import { ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { Task } from '@/entities/task';

import { useDeleteTaskMutation } from '@/features/task/deleteTask';

import { TaskAdditionalInfo } from '../TaskAdditionalInfo/TaskAdditionalInfo';
import { TaskBody } from '../TaskBody/TaskBody';
import { TaskHeader } from '../TaskHeader/TaskHeader';

import styles from './TaskPageContent.module.css';

interface TaskPageContentProps {
	task: Task;
}

export const TaskPageContent = ({ task }: TaskPageContentProps) => {
	const { isMobile, isTablet } = useScreenSize();
	const [deleteTask] = useDeleteTaskMutation();

	const handleDeleteTask = () => {
		void deleteTask(task.id);
	};

	return (
		<>
			<HeaderAdminPageDetailCard onDelete={handleDeleteTask} />
			<Flex gap="20" align="start">
				<Card withOutsideShadow className={styles.main}>
					<Flex direction="column" gap="20" maxWidth>
						<TaskHeader
							name={task.name}
							difficulty={task.difficulty}
							languages={task.supportedLanguages}
							categories={task.categories}
							companies={task.companies}
						/>
						<TaskBody description={task.description} />
					</Flex>
				</Card>

				{!isMobile && !isTablet && (
					<TaskAdditionalInfo
						languages={task.supportedLanguages}
						difficulty={task.difficulty}
						route={ROUTES.admin.tasks.page}
						categories={task.categories}
						companies={task.companies}
					/>
				)}
			</Flex>
		</>
	);
};
