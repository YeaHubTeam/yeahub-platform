import { ProfileSkillsStat, ProgressByCategoriesData } from '@/entities/quiz';

export const transformSkillsArray = (skillsStat: ProfileSkillsStat): ProgressByCategoriesData[] => {
	return skillsStat.fullSkillsQuestionsMap.map((fullSkill) => {
		const learnedSkill = skillsStat.learnedSkillsQuestionsMap.find(
			(learned) => learned.skill === fullSkill.skill,
		);

		const passedCount = learnedSkill ? learnedSkill.count : 0;
		const totalCount = fullSkill.count;
		const value = totalCount > 0 ? (passedCount / totalCount) * 100 : 0;

		return {
			category: fullSkill.skill,
			passed: passedCount,
			total: totalCount,
			value: value,
		};
	});
};
