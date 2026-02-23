import React from 'react';

import { ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Task } from '@/entities/task';

import { DeleteTaskButton } from '@/features/task/deleteTask';
import { TaskEditButton } from '@/features/task/editTask';

import { TaskAdditionalInfo } from '../TaskAdditionalInfo/TaskAdditionalInfo';
import { TaskBody } from '../TaskBody/TaskBody';
import { TaskHeader } from '../TaskHeader/TaskHeader';

import styles from './TaskPageContent.module.css';

interface TaskPageContentProps {
	task: Task;
}

export const TaskPageContent = ({ task }: TaskPageContentProps) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeader>
				<DeleteTaskButton taskId={task.id} isDetailPage />
				<TaskEditButton taskId={task.id} />
			</BackHeader>
			<Flex gap="20" align="start">
				<Card withOutsideShadow className={styles.main}>
					<Flex direction="column" gap="20" maxWidth>
						<TaskHeader
							name={task.name}
							difficulty={task.difficulty}
							languages={task.supportedLanguages}
							category={task.mainCategory}
						/>
						<TaskBody description={task.description} />
					</Flex>
				</Card>

				{!isMobile && !isTablet && (
					<TaskAdditionalInfo
						languages={task.supportedLanguages}
						difficulty={task.difficulty}
						route={ROUTES.admin.tasks.page}
						category={task.mainCategory}
					/>
				)}
			</Flex>
		</>
	);
};
