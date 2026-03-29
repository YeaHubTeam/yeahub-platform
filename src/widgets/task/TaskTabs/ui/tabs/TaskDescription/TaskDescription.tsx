import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { CompanyCompactList } from '@/entities/company';
import { ProgrammingLanguageList } from '@/entities/programmingLanguage/@x/task';
import { TaskDifficultyChip, TaskStatusChip, TaskCategoryChip, Task } from '@/entities/task';

type TaskDescriptionProps = {
	task: Task;
};

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
	return (
		<Flex direction="column" gap="20">
			<Text variant="body6" isMainTitle>
				{task.name}
			</Text>
			<Flex gap="10" wrap="wrap">
				<TaskStatusChip status={task.status} size="medium" />
				<TaskDifficultyChip difficulty={task.difficulty} />
				<ProgrammingLanguageList languages={task.supportedLanguages} />
				<TaskCategoryChip category={task.mainCategory} />
				<CompanyCompactList companies={task.companies} />
			</Flex>
			<TextHtml html={task.description} />
		</Flex>
	);
};
