import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { ResourcesFilterParams, ResourcesFilters } from '@/features/resources/filterResources';

import { SearchSection } from '@/widgets/SearchSection';

interface ResourcesAdminToolbarProps {
	searchValue?: string;
	onChangeTitle: (value: string) => void;
	onResetFilters: () => void;
	hasFilters: boolean;
	hasDrawerFilters: boolean;
	filters: ResourcesFilterParams;
	onChangeSpecialization: (specialization: ResourcesFilterParams['specialization']) => void;
	onChangeSkills: (skills?: ResourcesFilterParams['skills']) => void;
	onChangeTypes: (types?: ResourcesFilterParams['types']) => void;
	onChangeAuthorId: (authorId?: ResourcesFilterParams['authorId']) => void;
	onChangeIsMy: (isMy?: ResourcesFilterParams['isMy']) => void;
}

export const ResourcesAdminToolbar = ({
	searchValue,
	onChangeTitle,
	onResetFilters,
	hasFilters,
	filters,
	onChangeSpecialization,
	onChangeSkills,
	onChangeTypes,
	onChangeAuthorId,
	hasDrawerFilters,
	onChangeIsMy,
}: ResourcesAdminToolbarProps) => {
	const { isSmallScreen } = useScreenSize();

	return (
		<SearchSection
			searchValue={searchValue}
			onSearch={onChangeTitle}
			showResetFilterButton={hasFilters}
			onResetFilters={() => onResetFilters()}
			hasFilters={hasDrawerFilters}
			renderFilter={() => (
				<ResourcesFilters
					filters={filters}
					onChangeSpecialization={onChangeSpecialization}
					onChangeSkills={onChangeSkills}
					onChangeTypes={onChangeTypes}
					onChangeAuthorId={onChangeAuthorId}
					onChangeIsMy={onChangeIsMy}
				/>
			)}
			to={() => <Flex direction={isSmallScreen ? 'column' : 'row'} gap="10"></Flex>}
		/>
	);
};
