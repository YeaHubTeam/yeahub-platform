import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { ResourcesTypesFilterSection } from '@/entities/resource';
import { SkillsListField } from '@/entities/skill';
import { SpecializationsListField } from '@/entities/specialization';
import { UserSelect } from '@/entities/user';

import type { ResourcesFilterParams } from '@/features/resources/filterResources';

interface ResourcesAdminFiltersProps {
	filters: ResourcesFilterParams;
	onChangeSpecialization: (specialization: ResourcesFilterParams['specialization']) => void;
	onChangeSkills: (skills?: ResourcesFilterParams['skills']) => void;
	onChangeTypes: (types?: ResourcesFilterParams['types']) => void;
	onChangeAuthorId: (authorId?: ResourcesFilterParams['authorId']) => void;
	onChangeIsMy: (isMy?: ResourcesFilterParams['isMy']) => void;
}

export const ResourcesAdminFilters = ({
	filters,
	onChangeSpecialization,
	onChangeSkills,
	onChangeTypes,
	onChangeAuthorId,
	onChangeIsMy,
}: ResourcesAdminFiltersProps) => {
	return (
		<Flex direction="column" gap="24">
			<Switch
				checked={filters.isMy ?? false}
				onChange={(e) => onChangeIsMy(e.target.checked)}
				label="Мои ресурсы"
			/>

			<UserSelect
				value={filters.authorId}
				onChange={onChangeAuthorId}
				disabled={!!filters.isMy}
				title="Автор"
				placeholder="Выберите автора"
			/>

			<SpecializationsListField
				selectedSpecialization={filters.specialization}
				onChangeSpecialization={onChangeSpecialization}
			/>

			<SkillsListField
				selectedSkills={filters.skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={filters.specialization}
			/>

			<ResourcesTypesFilterSection selectedTypes={filters.types} onChooseTypes={onChangeTypes} />
		</Flex>
	);
};
