import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import {
	ChooseQuestionComplexitySkeleton,
	ChooseQuestionsCategoriesSkeleton,
	ChooseSpecializationSkeleton,
	RateFilterSectionSkeleton,
} from '@/entities/question';

export const PublicQuestionsFilterPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<ChooseSpecializationSkeleton />
			<ChooseQuestionsCategoriesSkeleton />
			<ChooseQuestionComplexitySkeleton />
			<RateFilterSectionSkeleton />
		</Flex>
	);
};
