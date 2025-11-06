import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { ResourcesStatusBlock, ResourcesTypesFilterSection } from '@/entities/resource';

import { ResourceRequestsFilterParams } from '../../model/types/filters';

interface MyResourcesFiltersPanelProps {
	filters: ResourceRequestsFilterParams;
	onChangeTitle: (title: ResourceRequestsFilterParams['title']) => void;
	onChangeStatus: (status: ResourceRequestsFilterParams['status']) => void;
	onChangeTypes: (types: ResourceRequestsFilterParams['types']) => void;
}

export const ResourceRequestsFilters = ({
	filters,
	onChangeTitle,
	onChangeStatus,
	onChangeTypes,
}: MyResourcesFiltersPanelProps) => {
	const { types, title, status } = filters;
	const { t } = useTranslation(i18Namespace.marketplace);

	return (
		<Flex direction="column" justify="start" gap="24">
			<SearchInput
				placeholder={t(Marketplace.SEARCH_PLACEHOLDER)}
				onSearch={onChangeTitle}
				currentValue={title}
			/>
			<ResourcesStatusBlock selectedStatus={status} onChooseStatus={onChangeStatus} />
			<ResourcesTypesFilterSection selectedTypes={types} onChooseTypes={onChangeTypes} />
		</Flex>
	);
};
