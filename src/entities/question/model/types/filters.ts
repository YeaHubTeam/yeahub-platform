import { SortOrder } from '@/shared/libs';

export interface QuestionsFilterParams {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	status?: QuestionFilterStatus;
	title?: string;
	specialization?: number;
	page?: number;
	isMy?: boolean;
	order?: SortOrder;
	orderBy?: QuestionFilterOrderBy;
	topics?: QuestionFilterTopic
}

export type QuestionFilterStatus = 'all' | 'learned' | 'not-learned' | 'favorite';

export type QuestionFilterOrderBy = 'title' | 'complexity' | 'rate';

export type QuestionFilterTopic = number[]
