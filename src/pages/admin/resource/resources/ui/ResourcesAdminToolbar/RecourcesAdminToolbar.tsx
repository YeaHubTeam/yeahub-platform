import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import type { ResourcesFilterParams } from '@/features/resources/filterResources';

import { SearchSection } from '@/widgets/SearchSection';

import { ResourcesAdminFilters } from '@/pages/admin/resource/resources/ui/ResourcesAdminFilters/RecourcesAdminFilters';

interface ResourcesAdminToolbarProps {
	searchValue?: string;
	onSearch: (value: string) => void;
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
	onSearch,
	onResetFilters,
	hasFilters,
	filters,
	onChangeSpecialization,
	onChangeSkills,
	onChangeTypes,
	onChangeAuthorId,
	onChangeIsMy,
	hasDrawerFilters,
}: ResourcesAdminToolbarProps) => {
	const { isSmallScreen } = useScreenSize();

	return (
		<SearchSection
			searchValue={searchValue}
			onSearch={onSearch}
			showResetFilterButton={hasFilters}
			onResetFilters={() => onResetFilters()}
			hasFilters={hasDrawerFilters}
			renderFilter={() => (
				<ResourcesAdminFilters
					filters={filters}
					onChangeSpecialization={onChangeSpecialization}
					onChangeSkills={onChangeSkills}
					onChangeTypes={onChangeTypes}
					onChangeAuthorId={onChangeAuthorId}
					onChangeIsMy={onChangeIsMy}
				/>
			)}
			to={() => (
				<Flex direction={isSmallScreen ? 'column' : 'row'} gap="10">
					<Button size="large" variant="destructive-outline">
						Delete Favourite
					</Button>
				</Flex>
			)}
		/>
	);
};
