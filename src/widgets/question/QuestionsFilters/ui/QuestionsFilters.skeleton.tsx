import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ChooseQuestionComplexitySkeleton, RateFilterSectionSkeleton } from '@/entities/question';
import { StatusFilterSectionSkeleton } from '@/entities/question/ui/StatusFilterSection/StatusFilterSection.skeleton';
import { SkillsListFieldSkeleton } from '@/entities/skill';

export const QuestionsFiltersSkeleton = () => {
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
