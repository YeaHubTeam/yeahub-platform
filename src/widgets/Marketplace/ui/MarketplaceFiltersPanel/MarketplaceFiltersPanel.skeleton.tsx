import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ChooseCollectionSpecializationSkeleton } from '@/entities/collection';

export const MarketplaceFiltersPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<ChooseCollectionSpecializationSkeleton />
		</Flex>
	);
};
