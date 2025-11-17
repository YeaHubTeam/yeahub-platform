import { Response } from '@/shared/types/types';
import { Author } from '@/shared/ui/AuthorInfo';

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
	createdBy: Author;
	updatedBy: Author | null;
	questionSpecializations: Specialization[];
	questionSkills: Skill[];
	checksCount?: number;
	isFavorite?: boolean;
	isLearned?: boolean;
	profileId?: string;
	disabled?: boolean;
}

export type PublicQuestion = Omit<
	Question,
	'isLearned' | 'profileId' | 'checksCount' | 'isFavorite'
>;

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

type skillFilterMode = 'ALL' | 'ANY';

export interface GetQuestionsListParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
	titleOrDescription?: string;
	skills?: number[];
	complexity?: number[];
	collection?: number;
	rate?: number[];
	keywords?: string[];
	skillFilterMode?: skillFilterMode;
	specialization?: number | number[];
	order?: string;
	orderBy?: string;
	random?: boolean;
	profileId?: string;
	areFavorites?: boolean;
	authorId?: string;
}

export type GetQuestionsListResponse = Response<Question[]>;

export type GetQuestionByIdParamsRequest = {
	questionId?: string;
	profileId: string;
};
export type GetQuestionByIdResponse = Question;

export interface GetQuestionsForLearnParamsRequest
	extends Omit<GetQuestionsListParamsRequest, 'order' | 'orderBy' | 'random'> {
	profileId: string;
	isLearned?: boolean;
	areFavorites?: boolean;
}
export type GetQuestionsForLearnResponse = Response<Question[]>;

export type GetPublicQuestionByIdResponse = PublicQuestion;

export type GetPublicQuestionByIdParamsRequest = {
	questionId?: string;
};

export type SkillQuestion = {
	skill: string;
	count: number;
};

export interface GetQuestionsBySpecializationCountResponse {
	total: number;
	skillsQuestions: SkillQuestion[];
}

export interface MostDifficultQuestion {
	questionId: number;
	title: string;
	answersCount: number;
	stat: number;
}

export interface MostDifficultQuestionsResponse {
	id: number;
	specialization: Specialization;
	calculatedAt: string;
	topStat: MostDifficultQuestion[];
}

export interface PopularQuestionStat {
	id: number;
	title: string;
	imageSrc: string;
	questionId: number;
	frequencyStat: number;
}

export interface PopularQuestionsSpecialization {
	specializationId: number;
	specializationTitle: string;
	calculatedAt: string;
	topStat: PopularQuestionStat[];
}

export type GetPopularQuestionsResponse = PopularQuestionsSpecialization[];
