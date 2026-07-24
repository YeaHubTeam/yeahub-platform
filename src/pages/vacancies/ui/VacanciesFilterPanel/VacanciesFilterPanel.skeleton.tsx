import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { SkillsListFieldSkeleton } from '@/entities/skill';
import { SpecializationsListFieldSkeleton } from '@/entities/specialization';
import {
	ChooseCompanyTypeSkeleton,
	ChooseEmploymentTypeSkeleton,
	ChooseEnglishLevelSkeleton,
	ChooseGradeSkeleton,
	ChooseIndustrySkeleton,
	ChooseSalarySkeleton,
	ChooseWorkFormatSkeleton,
} from '@/entities/vacancy';

export const VacanciesFilterPanelSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<ChooseWorkFormatSkeleton />
			<SpecializationsListFieldSkeleton />
			<SkillsListFieldSkeleton />
			<ChooseIndustrySkeleton />
			<ChooseGradeSkeleton />
			<ChooseCompanyTypeSkeleton />
			<ChooseEmploymentTypeSkeleton />
			<ChooseSalarySkeleton />
			<ChooseEnglishLevelSkeleton />
		</Flex>
	);
};
