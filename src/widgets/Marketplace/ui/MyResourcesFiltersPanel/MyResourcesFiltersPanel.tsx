import { FilterFromUser } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { ResourcesFilterSection } from '@/entities/resource';
import { MyResourcesFilterParams } from '@/entities/resource';

import { ResourcesStatusBlock } from '../ResourcesStatusBlock/ResourcesStatusBlock';
import { SearchBlock } from '../SearchBlock/SearchBlock';

interface MyResourcesFiltersPanelProps {
	filter: MyResourcesFilterParams;
	onChangeSearch: (value: string) => void;
	onChangeStatus: (value: FilterFromUser['status']) => void;
	onChangeResources: (resources: string[] | undefined) => void;
}

export const MyResourcesFiltersPanel = ({
	filter,
	onChangeSearch,
	onChangeStatus,
	onChangeResources,
}: MyResourcesFiltersPanelProps) => {
	const { resources, status } = filter;

	return (
		<Flex direction="column" justify="start" gap="24">
			<SearchBlock onChangeSearch={onChangeSearch} />

			<ResourcesStatusBlock selectedStatus={status} onChooseStatus={onChangeStatus} />

			<ResourcesFilterSection selectedResources={resources} onChooseResources={onChangeResources} />
		</Flex>
	);
};
