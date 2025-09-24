import { useState } from 'react';

import { Flex } from '@/shared/ui/Flex';

import { FilterParams, ResourcesFilterSection } from '@/entities/resource';
import { SkillsListField } from '@/entities/skill';
import { SpecializationsListField } from '@/entities/specialization';

import { SearchBlock } from '../SearchBlock/SearchBlock';

const DEFAULT_SPECIALIZATION = 11;

interface MarketplaceFiltersPanelProps {
	filter: FilterParams;
	onChangeSearch: (value: string) => void;
	onChangeSpecialization: (specialization: number[] | number) => void;
	onChangeSkills: (skills: number[] | undefined) => void;
	onChangeResources: (resources: string[] | undefined) => void;
}

export const MarketplaceFiltersPanel = ({
	filter,
	onChangeSearch,
	onChangeSpecialization,
	onChangeSkills,
	onChangeResources,
}: MarketplaceFiltersPanelProps) => {
	const { skills, specialization: filterSpecialization, resources } = filter;

	const selectedSpecialization = Array.isArray(filterSpecialization)
		? filterSpecialization[0]
		: filterSpecialization;

	const [localSpecialization, setLocalSpecialization] = useState<number | undefined>(
		Array.isArray(filterSpecialization) ? filterSpecialization[0] : filterSpecialization,
	);

	const handleSpecializationChange = (newSpecialization: number | undefined) => {
		setLocalSpecialization(newSpecialization);
		if (newSpecialization) {
			onChangeSpecialization([newSpecialization]);
		}
	};

	// const keywords = ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'];

	return (
		<Flex direction="column" justify="start" gap="24">
			<SearchBlock onChangeSearch={onChangeSearch} />
			<SpecializationsListField
				selectedSpecialization={localSpecialization}
				onChangeSpecialization={handleSpecializationChange}
			/>
			<SkillsListField
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={selectedSpecialization || DEFAULT_SPECIALIZATION}
			/>
			<ResourcesFilterSection selectedResources={resources} onChooseResources={onChangeResources} />
			{/* <KeywordsListSection keywords={keywords} route={ROUTES.marketplace.page} /> */}
		</Flex>
	);
};
