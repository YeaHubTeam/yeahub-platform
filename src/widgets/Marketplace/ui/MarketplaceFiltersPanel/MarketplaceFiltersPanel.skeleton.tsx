import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import {
	ChooseQuestionsCategoriesSkeleton,
	ChooseSpecializationSkeleton,
} from '@/entities/question';
import { ResourcesFilterSectionSkeleton } from '@/entities/resource';

export const MarketplaceFiltersPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<ChooseSpecializationSkeleton />
			<ChooseQuestionsCategoriesSkeleton />
			<ResourcesFilterSectionSkeleton />
		</Flex>
	);
};
