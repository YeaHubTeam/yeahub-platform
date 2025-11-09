import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

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
	showSpecialization?: boolean;
}

export const ResourcesFilters = ({
	filters,
	onChangeTitle,
	onChangeSpecialization,
	onChangeSkills,
	onChangeTypes,
	showSpecialization = true,
}: MarketplaceFiltersPanelProps) => {
	const { skills, specialization, types, title } = filters;
	const specializationId = useAppSelector(getSpecializationId);

	const { t } = useTranslation(i18Namespace.marketplace);

	return (
		<Flex direction="column" justify="start" gap="24">
			<SearchInput
				placeholder={t(Marketplace.SEARCH_PLACEHOLDER)}
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
