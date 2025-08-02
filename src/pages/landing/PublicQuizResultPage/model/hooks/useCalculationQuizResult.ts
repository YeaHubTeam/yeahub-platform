import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';

import { GetQuestionsBySpecializationCountResponse } from '@/entities/question';
import { LS_ACTIVE_MOCK_QUIZ_KEY, Quiz } from '@/entities/quiz';

export interface ProfileSkillsStat {
	skillStat: {
		fullSkillsQuestionsMap: { skill: string; count: number }[];
		learnedSkillsQuestionsMap: { skill: string; count: number }[];
	};
}

export const useCalculationQuizResult = (
	quizResults?: GetQuestionsBySpecializationCountResponse,
): ProfileSkillsStat => {
	if (!quizResults || !quizResults.skillsQuestions) {
		return {
			skillStat: {
				fullSkillsQuestionsMap: [],
				learnedSkillsQuestionsMap: [],
			},
		};
	}

	const activeMockQuiz: Quiz = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
	const learnedCount = activeMockQuiz.response.answers.filter((el) => el.answer === 'KNOWN');

	const learnedMap = new Map(learnedCount.map((lq) => [lq.questionId, true]));

	const transformSkillsStat = quizResults?.skillsQuestions.map((skill) => {
		const skillQuestionsSet = new Set(
			activeMockQuiz.questions
				.filter((question) =>
					question.questionSkills.some((o) => o.title.toUpperCase() === skill.skill.toUpperCase()),
				)
				.map((question) => question.id),
		);

		const passedCount = Array.from(skillQuestionsSet).reduce((count, questionId) => {
			return learnedMap.has(questionId) ? count + 1 : count;
		}, 0);

		return {
			category: skill.skill,
			total: skill.count,
			value: passedCount,
		};
	});

	const [fullSkillsQuestionsMap, learnedSkillsQuestionsMap] = transformSkillsStat
		.filter((e: { total: number }) => e.total > 0)
		.reduce(
			(
				acc: [{ skill: string; count: number }[], { skill: string; count: number }[]],
				skillStat,
			) => {
				acc[0].push({ skill: skillStat.category, count: skillStat.total });
				acc[1].push({ skill: skillStat.category, count: skillStat.value });
				return acc;
			},
			[[], []],
		);

	return {
		skillStat: {
			fullSkillsQuestionsMap,
			learnedSkillsQuestionsMap,
		},
	};
};
