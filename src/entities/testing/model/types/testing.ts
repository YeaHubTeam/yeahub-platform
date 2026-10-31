import type { Response } from '@/shared/libs';

import { Question } from '../../@x/question';

export interface TestingAnswer {
	questionId: number;
	questionTitle: string;
	answer: 'KNOWN' | 'UNKNOWN';
}

export interface ActiveTest {
	id: string;
	profileId: string;
	quizNumber: number;
	fullCount: number;
	skills: string[];
	response: {
		answers: TestingAnswer[];
		questions: Question[];
	};
}

export type GetActiveTestResponse = Response<ActiveTest[]>;
