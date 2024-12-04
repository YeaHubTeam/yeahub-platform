import { http } from 'msw';

import { questionsMock } from '@/entities/question';

import { deleteQuestionApiUrls } from '../../model/constants/deleteQuestionConstants';

export const deleteQuestionMock = http.get(
	process.env.API_URL + deleteQuestionApiUrls.deleteQuestion,
	({ params }) => {
		const questionId = Number(params.questionId);

		const index = questionsMock.data.findIndex((question) => question.id === questionId);

		if (index !== 1) {
			questionsMock.data.splice(index, 1);
		}

		return new Response();
	},
);
