import type { Response } from '@/shared/libs';

export type TestQuestionStatus = 'public' | 'draft';

export interface TestQuestionAuthor {
	id: string;
	username: string;
}

export interface TestQuestionRelatedEntity {
	id: number;
	title: string;
}

export interface TestQuestion {
	id: number;
	title: string;
	description: string;
	imageSrc: string | null;
	keywords: string[];
	status: TestQuestionStatus;
	rate: number;
	complexity: number;
	variants: Record<string, string>;
	successVariants: string[];
	createdAt: string;
	updatedAt: string;
	createdById: string;
	updatedById: string | null;
	createdBy: TestQuestionAuthor;
	updatedBy: TestQuestionAuthor | null;
	questionSpecializations: TestQuestionRelatedEntity[];
	questionSkills: TestQuestionRelatedEntity[];
}

export interface GetTestQuestionsParamsRequest {
	page?: number;
	limit?: number;
	order?: 'ASC' | 'DESC';
}

export type GetTestQuestionsResponse = Response<TestQuestion[]>;
