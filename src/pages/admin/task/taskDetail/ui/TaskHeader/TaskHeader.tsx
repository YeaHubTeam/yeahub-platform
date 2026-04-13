import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Company } from '@/entities/company';
import { ProgrammingLanguage } from '@/entities/programmingLanguage';
import { TaskCategoryCode, TaskDifficulty } from '@/entities/task';

import { TaskAdditionalInfoDrawer } from '../TaskAdditionalInfoDrawer/TaskAdditionalInfoDrawer';

interface TaskHeaderProps {
	name: string;
	languages: ProgrammingLanguage[];
	difficulty: TaskDifficulty;
	category: TaskCategoryCode;
	companies: Company[];
}

export const TaskHeader = ({
	name,
	languages,
	difficulty,
	category,
	companies,
}: TaskHeaderProps) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex direction="column" gap="8">
			<Flex gap="10" wrap="nowrap" justify="between">
				<Text variant="body6" isMainTitle>
					{name}
				</Text>
				{(isMobile || isTablet) && (
					<TaskAdditionalInfoDrawer
						languages={languages}
						difficulty={difficulty}
						category={category}
						companies={companies}
					/>
				)}
			</Flex>
		</Flex>
	);
};
