import { Flex } from '@/shared/ui/Flex';

import { SkillsListField } from '@/entities/skill';

import { TopicsFilterParams } from '../../model/types/filters';

interface TopicsFiltersProps {
	filters: TopicsFilterParams;
	onChangeSkillIds: (skillIds?: TopicsFilterParams['skillIds']) => void;
}

export const TopicsFilters = ({ filters, onChangeSkillIds }: TopicsFiltersProps) => {
	const { skillIds } = filters;

	return (
		<Flex direction="column" gap="24">
			<SkillsListField
				selectedSkills={skillIds}
				onChangeSkills={(skills) => onChangeSkillIds(skills)}
			/>
		</Flex>
	);
};
