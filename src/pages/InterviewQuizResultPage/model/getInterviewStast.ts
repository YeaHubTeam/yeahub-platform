import { Answers } from '@/entities/quiz';

export const getInterviewStats = (questions: Answers[] = []) => {
	const totalQuestions = questions.length;
	const countPercents = (total: number, success: number) => {
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
				{ name: 'Знаю', value: 0, itemStyle: { color: '#400799' } },
				{ name: 'Не знаю', value: 0, itemStyle: { color: '#E1CEFF' } },
				{ name: 'Повторить', value: 0, itemStyle: { color: '#6A0BFF' } },
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
