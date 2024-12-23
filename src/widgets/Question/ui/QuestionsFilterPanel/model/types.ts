export interface FilterParams {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	status?: QuestionFilterStatus;
	title?: string;
}

export type QuestionFilterStatus = 'all' | 'learned' | 'not-learned';

export interface QuestionFilterStatusItem {
	id: QuestionFilterStatus;
	title: string;
}

export type DisplayMode = 'popover' | 'link';
