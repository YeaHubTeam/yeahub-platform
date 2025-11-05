import { Flex } from '@/shared/ui/Flex';

import { SpecializationsListField } from '@/entities/specialization';

import { SkillsFilterParams } from '../model/types/filters';

interface SkillsFiltersProps {
	filters: SkillsFilterParams;
	onChangeSpecialization: (specialization?: SkillsFilterParams['specialization']) => void;
}

export const SkillsFilters = ({ filters, onChangeSpecialization }: SkillsFiltersProps) => {
	const { specialization } = filters;

	return (
		<Flex direction="column" gap="24">
			<SpecializationsListField
				selectedSpecialization={specialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
		</Flex>
	);
};
