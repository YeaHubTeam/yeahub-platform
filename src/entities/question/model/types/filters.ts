import { SortOrder } from '@/shared/libs';

export interface QuestionsFilterParams {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	status?: QuestionFilterStatus;
	authorId?: string;
	title?: string;
	specialization?: number;
	page?: number;
	isMy?: boolean;
	order?: SortOrder;
	orderBy?: QuestionFilterOrderBy;
	topics?: number[];
}

export type QuestionFilterStatus = 'all' | 'learned' | 'not-learned' | 'favorite';

export type QuestionFilterOrderBy = 'title' | 'complexity' | 'rate';
