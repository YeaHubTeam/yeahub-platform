import { Response } from '@/shared/libs';

export interface TestQuestionEntity {
	id: number;
	title: string;
}

export interface TestQuestionAuthor {
	id: string;
	username: string;
}

export interface TestQuestion {
	id: number;
	title: string;
	variants: number;
	successVariants: number;
	questionSpecializations: TestQuestionEntity[];
	questionSkills: TestQuestionEntity[];
	rate: number;
	complexity: number;
	createdBy: TestQuestionAuthor;
	createdAt: string;
}

export interface GetTestQuestionsListParamsRequest {
	page?: number;
	limit?: number;
	name?: string;
	authorId?: string;
	specializations?: number;
	skills?: number[];
	rate?: number[];
	complexity?: number[];
}

export type GetTestQuestionsListResponse = Response<TestQuestion[]>;
