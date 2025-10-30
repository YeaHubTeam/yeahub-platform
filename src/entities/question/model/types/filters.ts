export interface QuestionsFilterParams {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	status?: QuestionFilterStatus;
	title?: string;
	specialization?: number;
	page?: number;
}

export type QuestionFilterStatus = 'all' | 'learned' | 'not-learned' | 'favorite';
