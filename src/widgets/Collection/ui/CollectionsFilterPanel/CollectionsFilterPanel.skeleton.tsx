import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ChooseCollectionSpecializationSkeleton } from '@/entities/collection';

export const CollectionsFilterPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<ChooseCollectionSpecializationSkeleton />
		</Flex>
	);
};
