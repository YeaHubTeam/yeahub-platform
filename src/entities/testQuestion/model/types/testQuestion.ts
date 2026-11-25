import { Response, SortOrder } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

import { Skill } from '@/entities/skill/@x/testQuestion';
import { Specialization } from '@/entities/specialization/@x/testQuestion';
import { Topic } from '@/entities/topic/@x/testQuestion';

export type TestQuestionStatus = 'public' | 'draft';

export type TestQuestionSkillFilterMode = 'ALL' | 'ANY';

export type TestQuestionOrderBy = 'createdAt' | 'title' | 'rate' | 'complexity' | 'createdById';

export interface TestQuestion {
	id: number;
	title: string;
	description: string;
	code?: string | null;
	imageSrc: string | null;
	keywords: string[] | null;
	longAnswer?: string | null;
	shortAnswer?: string | null;
	status: TestQuestionStatus;
	rate: number | null;
	complexity: number | null;
	variants: Record<string, string>;
	successVariants: string[] | null;
	createdAt: string;
	updatedAt: string;
	createdById: string | null;
	updatedById: string | null;
	createdBy: Author | null;
	updatedBy: Author | null;
	questionSpecializations: Specialization[];
	questionSkills: Skill[];
	questionTopics?: Topic[];
	checksCount?: number;
	isLearned?: boolean;
	isFavorite?: boolean;
	profileId?: string;
	lastUpdate?: string;
}

export interface GetTestQuestionsListParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
	titleOrDescription?: string;
	skills?: number[];
	skillFilterMode?: TestQuestionSkillFilterMode;
	complexity?: number[];
	rate?: number[];
	keywords?: string[];
	collection?: number;
	specializationId?: number;
	specializationSlug?: string;
	article?: number;
	authorId?: string;
	createdAtFrom?: string;
	createdAtTo?: string;
	orderBy?: TestQuestionOrderBy;
	order?: SortOrder;
	random?: boolean;
	profileId?: string;
}

export type GetTestQuestionsListResponse = Response<TestQuestion[]>;
