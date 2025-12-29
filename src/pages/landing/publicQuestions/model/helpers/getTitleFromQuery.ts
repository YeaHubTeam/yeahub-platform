import { Skill } from '@/entities/skill';

export const getSkillTitles = (skills: Skill[] = [], filterSkills: number[] | undefined) => {
	return skills
		.filter((skill) => filterSkills?.includes(skill.id))
		.map((skill) => skill.title)
		.join(', ');
};

export const getSpecializationTitleFromSkills = (
	skills: Skill[] = [],
	filterSpecialization?: number,
): string | undefined => {
	return skills[0]?.specializations?.find((spec) => spec.id === filterSpecialization)?.title;
};
