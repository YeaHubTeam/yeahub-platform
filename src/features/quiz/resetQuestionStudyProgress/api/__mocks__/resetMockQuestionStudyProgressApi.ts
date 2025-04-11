import { http, HttpResponse } from 'msw';

import {
	ResetQuestionStudyProgressParams,
	ResetQuestionStudyProgressResponse,
} from '../../model/types/resetQuestionStudyProgressTypes';

export const resetMockQuestionStudyProgressApi = http.put<
	Record<keyof ResetQuestionStudyProgressParams, string>,
	ResetQuestionStudyProgressResponse
>(process.env.API_URL + 'interview-preparation/learn/:profileId/reset/:questionId', async (req) => {
	const { profileId, questionId } = req.params;

	if (!profileId || !questionId) {
		return HttpResponse.json(
			{
				message: 'Missing profileId or questionId',
				statusCode: 400,
			},
			{ status: 400 },
		);
	}

	return HttpResponse.json(
		{
			message: `Progress reset successfully for ${profileId} and ${questionId}`,
			statusCode: 200,
		},
		{ status: 200 },
	);
});
