import { i18Namespace, i18n, InterviewStatistics, ROUTES } from '@/shared/config';

import { ProfileQuestionsStat } from '@/entities/quiz';

export const getQuestionsStats = (questionsStat?: ProfileQuestionsStat) => [
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_ALL, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.uniqueQuestionsCount ?? 0),
		route: questionsStat ? `${ROUTES.wiki.questions.page}?page=1&status=all` : undefined,
	},
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_NEW, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.unlearnedQuestionsCount ?? 0),
		route: questionsStat ? `${ROUTES.wiki.questions.page}?page=1&status=not-learned` : undefined,
	},
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_IN_PROCESS, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.inProgressQuestionsCount ?? 0),
		route: questionsStat ? `${ROUTES.wiki.questions.page}?page=1&status=not-learned` : undefined,
	},
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_LEARNED, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.learnedQuestionsCount ?? 0),
		route: questionsStat ? `${ROUTES.wiki.questions.page}?page=1&status=learned` : undefined,
	},
];
