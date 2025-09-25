import { InterviewPopularQuestions } from '@/widgets/interview/InterviewPopularQuestions';

export const AnalyticsPage = () => {
	const popularQuestions = [
		{
			title: 'Что такое Virtual DOM, и как он работает?',
			frequencyStat: 82,
		},
		{
			title: 'Что такое Virtual DOM, и как он работает?',
			frequencyStat: 72,
		},
		{
			title: 'Что такое Virtual DOM, и как он работает?',
			frequencyStat: 62,
		},
	];
	return <InterviewPopularQuestions topStat={popularQuestions} />;
};
export default AnalyticsPage;
