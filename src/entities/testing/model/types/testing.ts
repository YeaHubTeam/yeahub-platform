import type { Response } from '@/shared/libs';

export interface TestingAnswer {
	questionId: number;
	questionTitle: string;
	answer: unknown[];
}

export interface ActiveTest {
	id: string;
	profileId: string;
	testNumber: number;
	fullCount: number;
	skills: string[];
	response: {
		answers: TestingAnswer[];
	};
	questions: ActiveTestQuestion[];
}

export interface ActiveTestQuestion {
	id: number;
	title: string;
	imageSrc: string | null;
}

export type GetActiveTestResponse = Response<ActiveTest[]>;
