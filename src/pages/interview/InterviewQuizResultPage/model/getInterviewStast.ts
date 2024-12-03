import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { Answers } from '@/entities/quiz';

export const getInterviewStats = (questions: Answers[] = []) => {
	const totalQuestions = questions.length;
	const countPercents = (total: number, success: number) => {
		if (total === 0 || success === 0) return 0;
		return Math.round((success / total) * 100);
	};

	const countResults = (questions: Answers[]) =>
		questions.reduce(
			(acc, curr) => {
				if (curr.answer === 'KNOWN') acc[0].value = acc[0].value + 1;
				if (curr.answer === 'UNKNOWN') acc[1].value = acc[1].value + 1;
				if (curr.answer === 'REPEAT') acc[2].value = acc[2].value + 1;
				return acc;
			},
			[
				{
					name: i18n.t(Translation.INTERVIEWRESULT_KNOWN),
					value: 0,
					itemStyle: { color: '#400799' },
				},
				{
					name: i18n.t(Translation.INTERVIEWRESULT_UNKNOWN),
					value: 0,
					itemStyle: { color: '#E1CEFF' },
				},
				{
					name: i18n.t(Translation.INTERVIEWRESULT_REPEAT),
					value: 0,
					itemStyle: { color: '#6A0BFF' },
				},
			],
		);
	const stats = countResults(questions).map((item) => {
		const percents = countPercents(totalQuestions, item.value);
		return { ...item, value: percents };
	});

	return {
		questionsTotalCount: totalQuestions,
		stats: stats,
	};
};
