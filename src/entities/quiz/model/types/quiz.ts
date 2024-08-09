import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

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
	profileId: string;
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
	imageSrc?: string;
	longAnswer?: string;
}

export interface InterviewQuizParams {
	page?: number;
	limit?: number;
}

export interface InterviewQuizGetRequest {
	profileId?: string;
	params: InterviewQuizParams;
}

export type ActiveQuizDataResponse = Omit<NewQuizResponse, 'questions'>;

export interface ExtraArgument {
	navigate: (path: string) => void;
}

export interface Interview {
	id: number;
	title: string;
	description: string;
	keywords: string[];
	date: Date;
	correctAnswersCount: number;
	incorrectAnswersCount: number;
	timeStamp?: string;
	questionCount?: number;
	questionCategories?: string[];
}

export interface InterviewQuestion {
	id: string;
	img: string;
	title: string;
	result: string;
}

export interface InterviewQuestionBtn {
	result: string;
	label: string;
	icon: IconsName;
}
