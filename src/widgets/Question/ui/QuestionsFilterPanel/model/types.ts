export interface FilterParams {
	page?: number;
	title?: string;
	skills?: number[];
	rate?: number[];
	complexity?: number[];
	status: QuestionFilterStatus;
}

export type QuestionFilterStatus = 'all' | 'learned' | 'not-learned';

export interface QuestionFilterStatusItem {
	id: QuestionFilterStatus;
	title: string;
}
