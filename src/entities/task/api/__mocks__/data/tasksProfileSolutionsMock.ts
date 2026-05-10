import { programmingLanguagesMock } from '@/entities/programmingLanguage/@x/task';

import type { TaskSolution } from '../../../model/types/task';

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
		solutionLanguage: programmingLanguagesMock.javascript,
		createdAt: '2024-01-01T09:00:00.000Z',
		updatedAt: '2024-01-01T10:30:00.000Z',
	},
];
