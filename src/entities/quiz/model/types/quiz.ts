// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Question } from '@/entities/question';

export type QuestionModeType = 'REPEAT' | 'NEW' | 'RANDOM';

export interface CreateNewQuizGetRequest {
	profileId?: string;
	params?: CreateNewQuizParams;
}

export interface CreateNewQuizParams {
	skills?: number[];
	minComplexity?: number;
	maxComplexity?: number;
	limit?: number;
	mode?: QuestionModeType;
}

export interface NewQuizResponse {
	profileID: string;
	fullCount: number;
	skills: string[];
	questions: Question[];
	response: Response;
	id: string;
}

export interface Response {
	answers: Answers[];
}

export interface Answers {
	questionId: number;
	questionTitle: string;
	answer: string;
}
