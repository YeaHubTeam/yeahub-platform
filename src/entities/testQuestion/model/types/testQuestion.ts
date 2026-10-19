import type { Response, SortOrder } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

import { Skill } from '@/entities/skill/@x/testQuestion';
import { Specialization } from '@/entities/specialization/@x/testQuestion';

export type TestQuestionStatus = 'public' | 'draft';

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
	createdBy: Author;
	updatedBy: Author | null;
	questionSpecializations: Specialization[];
	questionSkills: Skill[];
}

export interface GetTestQuestionsParamsRequest {
	page?: number;
	limit?: number;
	order?: SortOrder;
	random?: boolean;
	specializationId?: number | number[];
}

export type GetTestQuestionsResponse = Response<TestQuestion[]>;

export type GetTestQuestionKeywordsParamsRequest = {
	page?: number;
	limit?: number;
	title?: string;
};

export type GetTestQuestionKeywordsResponse = Response<string[]>;
