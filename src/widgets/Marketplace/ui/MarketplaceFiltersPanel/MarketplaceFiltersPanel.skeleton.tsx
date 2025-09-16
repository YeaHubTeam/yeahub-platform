import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ChooseQuestionsCategoriesSkeleton } from '@/entities/question';
import { ResourcesFilterSectionSkeleton } from '@/entities/resource';
import { SpecializationsListFieldSkeleton } from '@/entities/specialization';

export const MarketplaceFiltersPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<SpecializationsListFieldSkeleton />
			<ChooseQuestionsCategoriesSkeleton />
			<ResourcesFilterSectionSkeleton />
		</Flex>
	);
};
