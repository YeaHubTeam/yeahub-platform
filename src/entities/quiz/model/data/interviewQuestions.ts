import { Answers, InterviewQuestionBtn } from '../types/quiz';

// временные данные
export const QUIZ_QUESTIONS: Answers[] = [
	{
		answer: 'UNKNOWN',
		questionId: 1,
		questionTitle: 'Event Loop11112323',
	},
	{
		answer: 'UNKNOWN',
		questionId: 2,
		questionTitle: 'Event Loop11112323',
	},
	{
		answer: 'UNKNOWN',
		questionId: 3,
		questionTitle: 'Event Loop11112323',
	},
	{
		answer: 'UNKNOWN',
		questionId: 4,
		questionTitle: 'Event Loop11112323',
	},
];

// Временные данные
export const MOCK_QUIZ = {
	id: '1',
	title: '№1',
	passedCount: 15,
	allCount: 20,
	totalAttempts: 120,
	date: '2024-07-08T21:51:13.497Z',
	duration: '00:40:53',
	stats: [
		{ value: 60, name: 'Знаю', itemStyle: { color: '#400799' } },
		{ value: 40, name: 'Не знаю', itemStyle: { color: '#E1CEFF' } },
		{ value: 55, name: 'Повторить', itemStyle: { color: '#6A0BFF' } },
	],
	questions: [
		{
			id: '1',
			img: '',
			title: 'Что такое Virtual DOM, и как он работает?',
			result: 'repeat',
		},
		{
			id: '2',
			img: '',
			title: 'Что такое Virtual DOM, и как он работает?',
			result: 'success',
		},
		{
			id: '3',
			img: '',
			title: 'Что такое Virtual DOM, и как он работает?',
			result: 'failed',
		},
	],
};

export const INTERVIEW_BTNS_DATA: InterviewQuestionBtn[] = [
	{
		result: 'failed',
		label: 'Не знаю',
		icon: 'thumbsDown',
	},
	{
		result: 'repeat',
		label: 'Повторить',
		icon: 'clockCounterClockwise',
	},
	{
		result: 'success',
		label: 'Знаю',
		icon: 'thumbsUp',
	},
];
