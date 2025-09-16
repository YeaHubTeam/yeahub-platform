import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import {
	ChooseQuestionComplexitySkeleton,
	ChooseQuestionsCategoriesSkeleton,
	RateFilterSectionSkeleton,
} from '@/entities/question';
import { SpecializationsListFieldSkeleton } from '@/entities/specialization';

export const PublicQuestionsFilterPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<SpecializationsListFieldSkeleton />
			<ChooseQuestionsCategoriesSkeleton />
			<ChooseQuestionComplexitySkeleton />
			<RateFilterSectionSkeleton />
		</Flex>
	);
};
