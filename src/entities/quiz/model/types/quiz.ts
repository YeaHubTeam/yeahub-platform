type QuestionModeType = 'REPEAT' | 'NEW' | 'RANDOM';

export interface CreateNewQuizGetRequest {
	profileId: string;
	params: CreateNewQuizParams;
}

export interface CreateNewQuizParams {
	skills: number[];
	minComplexity: number;
	maxComplexity: number;
	limit: number;
	mode: QuestionModeType;
}

export interface NewQuizResponse {
	profileID: string;
	fullCount: number;
	skills: string[];
	questions: Question[];
	response: Response;
	id: string;
}

export interface Question {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	keywords: string[];
	longAnswer: string;
	shortAnswer: string;
	status: string;
	rate: number;
	createdAt: Date;
	updatedAt: Date;
	createdBy: null | string;
	updatedBy: null;
	questionSpecializations: QuestionSkill[];
	questionSkills: QuestionSkill[];
	complexity?: number;
}

export interface QuestionSkill {
	id: string;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}
