import { DefaultBodyType, HttpResponse, http } from 'msw';

import { GetQuizResults } from '@/entities/quiz/model/types/quiz';

export default http.get<Record<string, string>, DefaultBodyType, GetQuizResults>(
	process.env.API_URL + 'interview-preparation/stat',
	() => {
		const responseData: GetQuizResults = {
			total: 120,
			skillsQuestions: [
				{ skill: 'React', count: 10 },
				{ skill: 'JavaScript', count: 10 },
				{ skill: 'TypeScript', count: 10 },
				{ skill: 'HTML', count: 10 },
				{ skill: 'CSS', count: 10 },
				{ skill: 'Git', count: 10 },
				{ skill: 'React Router', count: 10 },
				{ skill: 'CI/CD', count: 10 },
				{ skill: 'Networks', count: 10 },
				{ skill: 'Redux', count: 10 },
				{ skill: 'Webpack', count: 10 },
				{ skill: 'Docker', count: 10 },
			],
		};

		return HttpResponse.json(responseData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
);
