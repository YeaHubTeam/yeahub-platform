import type { TaskCategory, TaskSolution } from '../../../model/types/task';

export const taskCategoriesMock: TaskCategory[] = [
	{
		id: 1,
		name: 'Алгоритмы',
		code: 'algorithms',
		description: 'Задачи на алгоритмы',
		parentCode: null,
		childrenCodes: ['dynamic-programming'],
		isActive: true,
	},
	{
		id: 2,
		name: 'Динамическое программирование',
		code: 'dynamic-programming',
		description: 'Задачи на динамическое программирование',
		parentCode: 'algorithms',
		childrenCodes: [],
		isActive: false,
	},
];

export const tasksProfileSolutionsMock: TaskSolution[] = [
	{
		id: '1',
		profileId: '101',
		taskId: '201',
		status: 'solved',
		attemptsCount: 3,
		lastAttemptAt: '2024-01-01T10:00:00.000Z',
		solvedAt: '2024-01-01T10:30:00.000Z',
		bestExecutionTime: 150,
		bestMemoryUsage: 512,
		solutionCode: 'function solution() {}',
		solutionLanguage: {
			id: 1,
			name: 'JavaScript',
			version: 'ES2021',
			monacoLangId: 'javascript',
			fileExtension: '.js',
			isActive: true,
			imageSrc: '',
			defaultPreloadedCode: '',
		},
		createdAt: '2024-01-01T09:00:00.000Z',
		updatedAt: '2024-01-01T10:30:00.000Z',
	},
];
