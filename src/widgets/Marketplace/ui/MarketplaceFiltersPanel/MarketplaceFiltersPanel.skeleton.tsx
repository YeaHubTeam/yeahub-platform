import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ResourcesFilterSectionSkeleton } from '@/entities/resource';
import { SkillsListFieldSkeleton } from '@/entities/skill';
import { SpecializationsListFieldSkeleton } from '@/entities/specialization';

export const MarketplaceFiltersPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<SpecializationsListFieldSkeleton />
			<SkillsListFieldSkeleton />
			<ResourcesFilterSectionSkeleton />
		</Flex>
	);
};
