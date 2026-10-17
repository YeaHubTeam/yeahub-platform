import { i18Namespace, i18n, InterviewStatistics } from '@/shared/config';

import { QuestionsStat } from '@/entities/testQuestion';

export const getQuestionsStats = (questionsStat?: QuestionsStat) => [
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_ALL, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.uniqueQuestionsCount ?? 0),
	},
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_NEW, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.unlearnedQuestionsCount ?? 0),
	},
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_IN_PROCESS, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.inProgressQuestionsCount ?? 0),
	},
	{
		title: i18n.t(InterviewStatistics.QUESTION_STATS_LEARNED, {
			ns: i18Namespace.interviewStatistics,
		}),
		value: String(questionsStat?.learnedQuestionsCount ?? 0),
	},
];
