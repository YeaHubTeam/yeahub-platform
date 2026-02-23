import { useTranslation } from 'react-i18next';

import { i18Namespace, Resources } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Switch } from '@/shared/ui/Switch';

import { getSpecializationId } from '@/entities/profile';
import { ResourcesTypesFilterSection } from '@/entities/resource';
import { SkillsListField } from '@/entities/skill';
import { SpecializationsListField } from '@/entities/specialization';

import { ResourcesFilterParams } from '../../model/types/filters';

interface MarketplaceFiltersPanelProps {
	filters: ResourcesFilterParams;
	onChangeTitle: (title: ResourcesFilterParams['title']) => void;
	onChangeSpecialization?: (specialization: ResourcesFilterParams['specialization']) => void;
	onChangeSkills: (skills?: ResourcesFilterParams['skills']) => void;
	onChangeTypes: (types?: ResourcesFilterParams['types']) => void;
	onChangeIsMy?: (isMy?: ResourcesFilterParams['isMy']) => void;
	showSpecialization?: boolean;
}

export const ResourcesFilters = ({
	filters,
	onChangeTitle,
	onChangeSpecialization,
	onChangeSkills,
	onChangeTypes,
	onChangeIsMy,
	showSpecialization = true,
}: MarketplaceFiltersPanelProps) => {
	const { skills, specialization, types, title, isMy } = filters;
	const specializationId = useAppSelector(getSpecializationId);

	const { t } = useTranslation(i18Namespace.resources);

	return (
		<Flex direction="column" justify="start" gap="24">
			{onChangeIsMy && (
				<Switch
					checked={isMy ?? false}
					onChange={(e) => onChangeIsMy?.(e.target.checked)}
					label={t(Resources.SORT_AUTHOR_TITLE)}
				/>
			)}
			<SearchInput
				placeholder={t(Resources.SEARCH_PLACEHOLDER)}
				onSearch={onChangeTitle}
				currentValue={title}
			/>
			{showSpecialization && onChangeSpecialization && (
				<SpecializationsListField
					selectedSpecialization={specialization}
					onChangeSpecialization={onChangeSpecialization}
				/>
			)}
			<SkillsListField
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={specialization || specializationId}
			/>
			<ResourcesTypesFilterSection selectedTypes={types} onChooseTypes={onChangeTypes} />
		</Flex>
	);
};
