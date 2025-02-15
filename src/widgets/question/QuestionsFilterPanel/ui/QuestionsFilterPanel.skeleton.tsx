import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import {
	ChooseQuestionComplexitySkeleton,
	ChooseQuestionsCategoriesSkeleton,
	RateFilterSectionSkeleton,
} from '@/entities/question';

import { StatusFilterSectionSkeleton } from './StatusFilterSection/StatusFilterSection.skeleton';

export const QuestionsFilterPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<ChooseQuestionsCategoriesSkeleton />
			<ChooseQuestionComplexitySkeleton />
			<RateFilterSectionSkeleton />
			<StatusFilterSectionSkeleton />
		</Flex>
	);
};
