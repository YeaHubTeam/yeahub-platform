import { useQueryFilter } from '@/shared/hooks/useQueryFilter';

import { useGetSkillsListQuery } from '@/entities/skill';
import { useGetSpecializationsListQuery } from '@/entities/specialization';

const DEFAULT_SPECIALIZATION = 11;

export const useTitleFromQuery = () => {
	const {
		filter: { skills: selectedSkills, specialization: selectedSpecialization },
	} = useQueryFilter();

	const preparedSpecializationsIds = selectedSpecialization
		? Array.isArray(selectedSpecialization)
			? selectedSpecialization
			: [selectedSpecialization]
		: undefined;

	const { data: skills } = useGetSkillsListQuery({
		specializations: preparedSpecializationsIds,
	});

	const { data: specializations } = useGetSpecializationsListQuery({});

	const preparedSpecializationId = selectedSpecialization
		? Array.isArray(selectedSpecialization)
			? selectedSpecialization[0]
			: selectedSpecialization
		: DEFAULT_SPECIALIZATION;
	const specializationName = specializations?.data.find(
		(spec) => spec.id === preparedSpecializationId,
	)?.title;

	const skillNames = skills?.data
		.filter((skill) => selectedSkills?.includes(skill.id))
		.map((skill) => skill.title)
		.join(', ');

	return skillNames || specializationName || '';
};
