import { http, HttpResponse, delay } from 'msw';

import { taskApiUrls } from '../../model/constants/task';
import { GetTasksListResponse, Task } from '../../model/types/task';

const mockTasks: Task[] = Array.from({ length: 2 }, (_, i) => ({
	id: `${i + 1}`,
	name: 'Task ' + (i + 1),
	slug: 'task-slug-' + (i + 1),
	description: 'Task description ' + (i + 1),
	status: 'solved',
	difficulty: 1,
	supportedLanguages: [
		{
			id: i + 1,
			name: 'JavaScript',
			version: '1.0.0',
			monacoLangId: 'javascript',
			fileExtension: 'js',
			isActive: true,
			imageSrc: 'https://example.com/image.jpg',
			defaultPreloadedCode: 'default code',
		},
	],
	mainCategory: 'algorithms',
	constraints: ['constraint 1', 'constraint 2'],
	testCases: [
		{ input: { nums: [2, 7, 11, 15], target: 9 }, expected_output: 'output', is_hidden: false },
	],
	taskStructures: [{ languageId: 1, solutionStub: 'stub', testFixture: 'test', isActive: true }],
	solutionSignature: 'signature',
	timeLimit: 1000,
	memoryLimit: 1024,
	canSolve: true,
	subscriptionLevel: 'free',
}));

export const handlers = [
	http.get(taskApiUrls.getTasksList, async ({ request }) => {
		const url = new URL(request.url);

		const page = Number(url.searchParams.get('page') || '1');
		const limit = Number(url.searchParams.get('limit') || '10');

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = mockTasks.slice(start, end);

		const response: GetTasksListResponse = {
			data: pagedData,
			limit: limit,
			total: mockTasks.length,
			page: page,
		};

		await delay(500);

		return HttpResponse.json(response);
	}),
];
