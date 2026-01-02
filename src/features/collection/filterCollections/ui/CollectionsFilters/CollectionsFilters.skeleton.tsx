import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { SpecializationsListFieldSkeleton } from '@/entities/specialization';

export const CollectionsFiltersSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<SpecializationsListFieldSkeleton />
		</Flex>
	);
};
