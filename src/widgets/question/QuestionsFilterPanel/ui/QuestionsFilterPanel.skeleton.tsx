import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ChooseQuestionComplexitySkeleton, RateFilterSectionSkeleton } from '@/entities/question';
import { SkillsListFieldSkeleton } from '@/entities/skill';

import { StatusFilterSectionSkeleton } from './StatusFilterSection/StatusFilterSection.skeleton';

export const QuestionsFilterPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<SkillsListFieldSkeleton />
			<ChooseQuestionComplexitySkeleton />
			<RateFilterSectionSkeleton />
			<StatusFilterSectionSkeleton />
		</Flex>
	);
};
