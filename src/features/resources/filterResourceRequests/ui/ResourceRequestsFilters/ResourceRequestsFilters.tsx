import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, Resources } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Switch } from '@/shared/ui/Switch';

import { getSpecializationId } from '@/entities/profile';
import { ResourcesStatusBlock, ResourcesTypesFilterSection } from '@/entities/resource';
import { SkillsListField } from '@/entities/skill';

import { ResourceRequestsFilterParams } from '../../model/types/filters';

interface MyResourcesFiltersPanelProps {
	filters: ResourceRequestsFilterParams;
	onChangeTitle: (title: ResourceRequestsFilterParams['title']) => void;
	onChangeStatus: (status: ResourceRequestsFilterParams['status']) => void;
	onChangeTypes: (types: ResourceRequestsFilterParams['types']) => void;
	onChangeSkills: (skills: ResourceRequestsFilterParams['skills']) => void;
	onChangeIsMy?: (isMy: boolean) => void;
}

export const ResourceRequestsFilters = ({
	filters,
	onChangeTitle,
	onChangeStatus,
	onChangeTypes,
	onChangeSkills,
	onChangeIsMy,
}: MyResourcesFiltersPanelProps) => {
	const { types, title, status } = filters;
	const { t } = useTranslation([i18Namespace.resources, i18Namespace.marketplace]);
	const specializationId = useAppSelector(getSpecializationId);

	return (
		<Flex direction="column" justify="start" gap="24">
			<Switch
				checked={!!filters.isMy}
				onChange={(e) => onChangeIsMy?.(e.target.checked)}
				label={t(Resources.REQUESTS_MY, { ns: i18Namespace.resources })}
			/>
			<SearchInput
				placeholder={t(Marketplace.SEARCH_PLACEHOLDER, { ns: i18Namespace.marketplace })}
				onSearch={onChangeTitle}
				currentValue={title}
			/>
			<SkillsListField
				selectedSkills={filters.skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={specializationId}
			/>
			<ResourcesStatusBlock selectedStatus={status} onChooseStatus={onChangeStatus} />
			<ResourcesTypesFilterSection selectedTypes={types} onChooseTypes={onChangeTypes} />
		</Flex>
	);
};
