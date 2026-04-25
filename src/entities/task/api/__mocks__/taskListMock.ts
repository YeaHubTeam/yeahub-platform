import { http, HttpResponse } from 'msw';

import { companiesMock } from '@/entities/company/@x/task';
import { ProgrammingLanguage } from '@/entities/programmingLanguage/@x/task';

import { taskApiUrls } from '../../model/constants/task';
import { GetTasksListResponse, Task } from '../../model/types/task';

const mockJavaScript: ProgrammingLanguage = {
	id: 1,
	name: 'JavaScript',
	version: 'Node.js 18',
	monacoLangId: 'javascript',
	fileExtension: 'js',
	isActive: true,
	imageSrc: 'https://yeatwork.ru/icons/js.png',
	defaultPreloadedCode: 'function solution() {\n\n}',
};

const mockPython: ProgrammingLanguage = {
	id: 2,
	name: 'Python',
	version: '3.10',
	monacoLangId: 'python',
	fileExtension: 'py',
	isActive: true,
	imageSrc: 'https://yeatwork.ru/icons/python.png',
	defaultPreloadedCode: 'def solution():\n    pass',
};

const mockTasks: Task[] = [
	{
		id: '1',
		name: 'Write debounce function',
		slug: 'write-debounce-function',
		description: 'Implement a function that delays the invocation of the passed function.',
		status: 'not_started',
		difficulty: 2,
		supportedLanguages: [mockJavaScript],
		mainCategory: 'algorithms',
		constraints: ['O(1) memory', 'No third-party libraries (lodash, etc.)'],
		testCases: [],
		taskStructures: [],
		solutionSignature: 'function debounce(fn, ms) {\n\n}',
		timeLimit: 1000,
		memoryLimit: 256,
		canSolve: true,
		subscriptionLevel: 'free',
		companies: companiesMock.data,
	},
	{
		id: '2',
		name: 'CSS Grid layout',
		slug: 'css-grid-layout',
		description: 'Create an adaptive 3-column grid.',
		status: 'not_started',
		difficulty: 3,
		supportedLanguages: [mockJavaScript, mockPython],
		mainCategory: 'algorithms',
		constraints: ['CSS Grid only', 'No media queries'],
		testCases: [],
		taskStructures: [],
		solutionSignature: '.grid-container {\n\n}',
		timeLimit: 500,
		memoryLimit: 128,
		canSolve: true,
		subscriptionLevel: 'premium',
		companies: companiesMock.data,
	},
];

const mockTasksResponse: GetTasksListResponse = {
	data: mockTasks,
	page: 1,
	limit: 10,
	total: 2,
};

export const taskListMock = http.get<Record<string, never>, never, GetTasksListResponse>(
	`${process.env.API_URL}${taskApiUrls.getTasksList}`,
	() => {
		return HttpResponse.json(mockTasksResponse, { status: 200 });
	},
);
