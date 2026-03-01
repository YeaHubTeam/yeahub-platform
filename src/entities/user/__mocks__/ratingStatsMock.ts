import { http, HttpResponse } from 'msw';

export const ratingStatsMock = http.get('*/ratings/stats', ({ request }) => {
	const url = new URL(request.url);
	const specializationId = url.searchParams.get('specializationId');

	let title = 'React Frontend Developer';
	if (specializationId === '2') title = 'Java Backend Developer';
	if (specializationId === '3') title = 'DevOps Engineer';

	return HttpResponse.json({
		specialization: {
			title: title,
		},
		allUsers: 1842,
		allQuestions: 1200,
		averageProgress: 42,
	});
});
