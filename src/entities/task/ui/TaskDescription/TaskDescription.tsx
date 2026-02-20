import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { ProgrammingLanguageList } from '@/entities/programmingLanguage/@x/task';
import { TaskCategoryChip } from '@/entities/task/ui/TaskCategoryChip/TaskCategoryChip';

import type { Task } from '../../model/types/task';
import { TaskDifficultyChip } from '../TaskDifficultyChip/TaskDifficultyChip';
import { TaskStatusChip } from '../TaskStatusChip/TaskStatusChip';

type TaskDescriptionProps = {
	task: Task;
};

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
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
		</Flex>
	);
};
