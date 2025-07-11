export interface FilterParams {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	status?: QuestionFilterStatus;
	title?: string;
	specialization?: number | number[];
}

export type QuestionFilterStatus = 'all' | 'learned' | 'not-learned' | 'favorite';

export interface QuestionFilterStatusItem {
	id: QuestionFilterStatus;
	title: string;
	tooltip?: string;
	disabled?: boolean;
}

export type DisplayMode = 'popover' | 'link';
