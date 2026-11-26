import { Flex } from '@/shared/ui/Flex';

import { SkillsListField } from '@/entities/skill';

import { TopicsFilterParams } from '../model/types/filters';

interface TopicsFilterProps {
	filters: TopicsFilterParams;
	onChangeSkills: (skillIsd: TopicsFilterParams['skillIds']) => void;
}

export const TopicsFilters = ({ filters, onChangeSkills }: TopicsFilterProps) => {
	return (
		<Flex direction="column" gap="24">
			<SkillsListField selectedSkills={filters.skillIds} onChangeSkills={onChangeSkills} />
		</Flex>
	);
};
