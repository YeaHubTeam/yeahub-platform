import { companiesMock } from '@/entities/company/@x/task';
import { programmingLanguagesMock } from '@/entities/programmingLanguage/@x/task';

import { Task } from '../../../model/types/task';

export const tasksMock: Task[] = [
	{
		id: '1',
		name: 'Write debounce function',
		slug: 'write-debounce-function',
		description: 'Implement a function that delays the invocation of the passed function.',
		status: 'not_started',
		difficulty: 2,
		supportedLanguages: [programmingLanguagesMock.javascript],
		mainCategory: 'algorithms',
		categories: ['algorithms'],
		constraints: ['O(1) memory', 'No third-party libraries (lodash, etc.)'],
		testCases: [],
		taskStructures: [],
		solutionSignature: 'function debounce(fn, ms) {\n\n}',
		timeLimit: 1000,
		memoryLimit: 256,
		canSolve: true,
		subscriptionLevel: 'free',
		companies: companiesMock.data.slice(0, 3),
	},
	{
		id: '2',
		name: 'CSS Grid layout',
		slug: 'css-grid-layout',
		description: 'Create an adaptive 3-column grid.',
		status: 'not_started',
		difficulty: 3,
		supportedLanguages: [programmingLanguagesMock.javascript, programmingLanguagesMock.python],
		mainCategory: 'algorithms',
		categories: ['algorithms'],
		constraints: ['CSS Grid only', 'No media queries'],
		testCases: [],
		taskStructures: [],
		solutionSignature: '.grid-container {\n\n}',
		timeLimit: 500,
		memoryLimit: 128,
		canSolve: true,
		subscriptionLevel: 'premium',
		companies: companiesMock.data.slice(3, 8),
	},
];
