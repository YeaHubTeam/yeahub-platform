export interface FilterParams {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	status?: QuestionFilterStatus;
	title?: string;
}

export type QuestionFilterStatus = 'all' | 'learned' | 'not-learned';

export interface QuestionFilterStatusItem {
	id: number;
	title: string;
}
