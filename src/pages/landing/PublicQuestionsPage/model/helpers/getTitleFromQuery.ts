// eslint-disable @conarti/feature-sliced/layers-slices
import { DEFAULT_SPECIALIZATION_NUMBER } from '@/shared/constants/queryConstants';

import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

/**
 * get the name of skills to display as an additional title
 */

export const transformSpecializationToGetSkills = (specialization?: number | number[]) => {
	if (!specialization || (Array.isArray(specialization) && specialization.length === 0))
		return [DEFAULT_SPECIALIZATION_NUMBER];

	if (Array.isArray(specialization)) {
		return specialization;
	}

	return [specialization];
};

export const getSkillTitles = (skills: Skill[] = [], filterSkills: number[] | undefined) => {
	return skills
		.filter((skill) => filterSkills?.includes(skill.id))
		.map((skill) => skill.title)
		.join(', ');
};

/**
 * get the name of the specialization to display as an additional title
 */

export const getSpecializationId = (
	specialization: number | number[] = DEFAULT_SPECIALIZATION_NUMBER,
) => {
	return Array.isArray(specialization) ? specialization[0] : specialization;
};

export const getSpecializationTitle = (
	filterSpecialization: number | number[] = [],
	specializations?: Specialization[],
) => {
	const preparedSpecializationId = getSpecializationId(filterSpecialization);

	return specializations?.find((spec) => spec.id === preparedSpecializationId)?.title;
};
