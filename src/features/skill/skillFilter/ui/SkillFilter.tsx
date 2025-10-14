import { useQueryFilter } from '@/shared/hooks';

import { SpecializationsListField } from '@/entities/specialization';

export const SkillFilter = () => {
	const {
		filter: { specialization },
		handleFilterChange,
	} = useQueryFilter();

	const selectedSpecialization = Array.isArray(specialization) ? specialization[0] : specialization;

	const onChangeSpecialization = (value: number | undefined) => {
		const specialization = value ? [value] : undefined;
		handleFilterChange({ specialization: specialization, skills: undefined });
	};

	return (
		<SpecializationsListField
			selectedSpecialization={selectedSpecialization}
			onChangeSpecialization={onChangeSpecialization}
		/>
	);
};
