import { Quiz, Answers } from '@/entities/quiz';

export interface ProfileSkillsStat {
	skillStat: {
		fullSkillsQuestionsMap: { skill: string; count: number }[];
		learnedSkillsQuestionsMap: { skill: string; count: number }[];
	};
}
export const useCalculationInterviewResult = (
	quiz?: Quiz,
	questions?: Answers[],
): ProfileSkillsStat => {
	if (!quiz) {
		return {
			skillStat: {
				fullSkillsQuestionsMap: [],
				learnedSkillsQuestionsMap: [],
			},
		};
	}

	const fullSkillsQuestionsMap = quiz.skills.map((skill) => ({
		skill: skill,
		count: quiz.questions.filter((q) => q.questionSkills.some((qs) => qs.title === skill)).length,
	}));

	const knownAnswers = questions?.filter((el) => el.answer === 'KNOWN') || [];

	const learnedSkillsQuestionsMap = quiz.skills.map((skill) => ({
		skill: skill,
		count: quiz.questions.filter(
			(q) =>
				q.questionSkills.some((qs) => qs.title === skill) &&
				knownAnswers.some((a) => a.questionId === q.id),
		).length,
	}));

	return {
		skillStat: {
			fullSkillsQuestionsMap,
			learnedSkillsQuestionsMap,
		},
	};
};
