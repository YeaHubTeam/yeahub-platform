import { Response } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

export type QuestionStatus = 'public' | 'draft';

export interface Question {
	id: number;
	title: string;
	description: string;
	code?: string | null;
	imageSrc?: string | null;
	keywords: string[];
	longAnswer: string;
	shortAnswer: string;
	status: QuestionStatus;
	rate: number;
	complexity: number;
	createdAt: string;
	updatedAt: string;
	createdBy: string | null;
	updatedBy: string | null;
	questionSpecializations: Specialization[];
	questionSkills: Skill[];
	checksCount?: number;
	isLearned?: boolean;
	profileId?: string;
}

export type PublicQuestion = Omit<Question, 'isLearned' | 'profileId' | 'checksCount'>;

export type CreateOrEditQuestionFormValues = Pick<
	Question,
	| 'id'
	| 'title'
	| 'description'
	| 'code'
	| 'imageSrc'
	| 'keywords'
	| 'longAnswer'
	| 'shortAnswer'
	| 'status'
	| 'rate'
	| 'complexity'
> & {
	specializations: number[];
	skills: number[];
};

export interface GetQuestionsListParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
	titleOrDescription?: string;
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	keywords?: string[];
	specialization?: number | number[];
	order?: string;
	orderBy?: string;
	random?: boolean;
	profileId?: string;
}

export type GetQuestionsListResponse = Response<Question[]>;

export type GetQuestionByIdParamsRequest = {
	questionId?: string;
	profileId: string;
};
export type GetQuestionByIdResponse = Question;

export interface GetLearnedQuestionsParamsRequest
	extends Omit<GetQuestionsListParamsRequest, 'order' | 'orderBy' | 'random'> {
	profileId: string;
	isLearned?: boolean;
}
export type GetLearnedQuestionsResponse = Response<Question[]>;

export type GetPublicQuestionByIdResponse = PublicQuestion;

export type GetPublicQuestionByIdParamsRequest = {
	questionId?: string;
};
