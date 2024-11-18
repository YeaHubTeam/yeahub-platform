import { DefaultBodyType, http, HttpResponse, PathParams } from 'msw';

import { Response } from '@/shared/types/types';

import { questionApiUrls } from '../../model/constants/question';
import { Question } from '../../model/types/question';

import { questionMockResponse } from './data';

export const questionListMock = http.get<PathParams, DefaultBodyType, Response<Question[]>>(
	process.env.API_URL + questionApiUrls.questions,
	({ request }) => {
		const url = new URL(request.url);
		const page = url.searchParams.get('page');
		const limit = url.searchParams.get('limit');
		const title = url.searchParams.get('title');
		const complexity = url.searchParams.get('complexity');
		const rate = url.searchParams.get('rate');
		const skills = url.searchParams.get('skills');

		let data = questionMockResponse.data;

		if (title) {
			data = data.filter(
				(item) =>
					item.title.toLowerCase().includes(title.toLowerCase()) ||
					item.keywords.some((keyword) => keyword.toLowerCase().includes(title.toLowerCase())),
			);
		}

		if (complexity) {
			const complexityValues = complexity
				.split(',')
				.map(Number)
				.filter((value) => !isNaN(value));
			data = data.filter(
				(item) => item.complexity !== undefined && complexityValues.includes(item.complexity),
			);
		}

		if (rate) {
			const rateValues = rate
				.split(',')
				.map(Number)
				.filter((value) => !isNaN(value));
			console.log('Rate parameter values:', rate);
			console.log('Rate numeric values:', rateValues);
			data = data.filter((item) => item.rate !== undefined && rateValues.includes(item.rate));
			console.log('Filtered by rate:', data);
		}

		if (skills) {
			const skillsValues = skills
				.split(',')
				.map(Number)
				.filter((value) => !isNaN(value));
			data = data.filter(
				(item) =>
					item.questionSkills &&
					item.questionSkills.some((skill) => skillsValues.includes(skill.id)),
			);
		}

		data = data.slice(
			Number(page) === 1 ? 0 : (Number(page) - 1) * Number(limit),
			Number(limit) * Number(page),
		);

		questionMockResponse.data = data;
		questionMockResponse.page = Number(page);
		return HttpResponse.json(questionMockResponse);
	},
);
