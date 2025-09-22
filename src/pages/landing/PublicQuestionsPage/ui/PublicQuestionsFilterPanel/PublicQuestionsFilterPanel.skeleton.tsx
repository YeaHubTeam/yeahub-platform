import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ChooseQuestionComplexitySkeleton, RateFilterSectionSkeleton } from '@/entities/question';
import { SkillsListFieldSkeleton } from '@/entities/skill';
import { SpecializationsListFieldSkeleton } from '@/entities/specialization';

export const PublicQuestionsFilterPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<SpecializationsListFieldSkeleton />
			<SkillsListFieldSkeleton />
			<ChooseQuestionComplexitySkeleton />
			<RateFilterSectionSkeleton />
		</Flex>
	);
};
