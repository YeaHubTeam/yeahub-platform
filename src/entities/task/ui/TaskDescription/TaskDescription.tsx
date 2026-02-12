import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { ProgrammingLanguageList } from '@/entities/programmingLanguage/@x/task';
import { TaskCategoryChip } from '@/entities/task/ui/TaskCategoryChip/TaskCategoryChip';

import type { Task } from '../../model/types/task';
import { TaskDifficultyChip } from '../TaskDifficultyChip/TaskDifficultyChip';
import { TaskStatusChip } from '../TaskStatusChip/TaskStatusChip';

import styles from './TaskDescription.module.css';

type TaskDescriptionProps = {
	task: Task;
};

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
	const { t } = useTranslation(i18Namespace.task);
	return (
		<Flex direction="column" gap="20">
			<Text variant="body6" isMainTitle>
				{task.name}
			</Text>
			<Flex gap="10">
				<TaskStatusChip status={task.status} size="medium" />
				<TaskDifficultyChip difficulty={task.difficulty} />
				<ProgrammingLanguageList languages={task.supportedLanguages} />
				<TaskCategoryChip category={task.mainCategory} />
			</Flex>
			<TextHtml html={task.description} />

			{task.constraints?.length > 0 && (
				<div className={styles.constraints}>
					<Text variant="head4" className={styles['constraints-title']}>
						{t(Tasks.DESCRIPTION_CONSTRAINTS_TITLE)}
					</Text>

					<ul className={styles['constraints-list']}>
						{task.constraints.map((constraint, index) => (
							<li key={`${constraint}-${index}`} className={styles['constraint-item']}>
								<Text variant="body2">{constraint}</Text>
							</li>
						))}
					</ul>
				</div>
			)}
		</Flex>
	);
};
