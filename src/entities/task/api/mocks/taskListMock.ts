import { http, HttpResponse } from 'msw';

import { taskApiUrls } from '../../model/constants/task';
import {
	GetTasksListResponse,
	Task,
	TaskStatus,
	TaskCategoryCode,
	TaskSubscriptionLevel,
	ProgrammingLanguage,
} from '../../model/types/task';

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
		name: 'Написать функцию debounce',
		slug: 'write-debounce-function',
		description: 'Реализовать функцию, которая откладывает вызов переданной функции.',
		status: 'PUBLISHED' as TaskStatus,
		difficulty: 2,
		supportedLanguages: [mockJavaScript],
		mainCategory: 'FRONTEND' as TaskCategoryCode,
		constraints: ['O(1) memory', 'Не использовать сторонние библиотеки (lodash и т.д.)'],
		testCases: [],
		taskStructures: [],
		solutionSignature: 'function debounce(fn, ms) {\n\n}',
		timeLimit: 1000,
		memoryLimit: 256,
		canSolve: true,
		subscriptionLevel: 'FREE' as TaskSubscriptionLevel,
	},
	{
		id: '2',
		name: 'Сверстать сетку на CSS Grid',
		slug: 'css-grid-layout',
		description: 'Создать адаптивную сетку из 3 колонок.',
		status: 'PUBLISHED' as TaskStatus,
		difficulty: 3,
		supportedLanguages: [mockJavaScript, mockPython],
		mainCategory: 'LAYOUT' as TaskCategoryCode,
		constraints: ['Только CSS Grid', 'Без media queries для мобильных устройств'],
		testCases: [],
		taskStructures: [],
		solutionSignature: '.grid-container {\n\n}',
		timeLimit: 500,
		memoryLimit: 128,
		canSolve: true,
		subscriptionLevel: 'PREMIUM' as TaskSubscriptionLevel,
	},
];

const mockTasksResponse: GetTasksListResponse = {
	data: mockTasks,
	page: 1,
	limit: 10,
	total: 2,
};

const GET_TASKS_URL = `${process.env.API_URL}${taskApiUrls.getTasksList}`;

export const taskListMock = http.get<Record<string, never>, never, GetTasksListResponse>(
	GET_TASKS_URL,
	() => {
		return HttpResponse.json(mockTasksResponse, { status: 200 });
	},
);
