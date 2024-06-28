export type QuestionType = 'task' | 'question' | 'test';

export interface QuestionSkill {
	id: string;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}

export interface Question {
	id: number;
	title: string;
	description: string;
	imageSrc?: string;
	keywords?: string[];
	shortAnswer?: string;
	status?: string;
	rate: number;
	longAnswer?: string;
	resources?: string[];
	author?: string;
	type?: QuestionType;
	criteria?: string;
	correctOptionId?: number;
	explanation?: string;
	time?: string;
	questionSkills?: QuestionSkill[];
	rating: number;
}

export interface QuestionsListParams {
	page?: number;
	limit?: number;
	title?: string;
	titleOrDescription?: string;
	rate?: number[]; //complexity
	specialization?: number[];
	progressStatus?: number[]; //not implemented
	complexity?: number[]; //not implemented
}
