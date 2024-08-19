import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Question } from '@/entities/question';
export type QuestionModeType = 'REPEAT' | 'NEW' | 'RANDOM';
export type QuizQuestionAnswerType = 'KNOWN' | 'UNKNOWN' | 'REPEAT';

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

export interface ActiveQuizWithDate extends NewQuizResponse {
	startDate: string;
}

/**
 * Request model for retrieving interview history
 * @property {string} profileID - User profile identifier. (Not user ID)
 * @property {QuizHistoryParams} params - Quiz parameters for the history request.
 */

export interface QuizHistoryRequest {
	profileID: string;
	params: QuizHistoryParams;
}

export interface QuizHistoryParams {
	page?: number;
	limit?: number;
	startAfter?: string;
	startBefore?: string;
	fullCount?: number;
	successCount?: number;
	skills?: string[];
}

/**
 * Model for retrieving interview history
 
 * @property {string} id - Unique identifier of the interview history.
 * @property {string} profileId - Identifier of the user profile.
 * @property {string} startDate - Start date and time of the interview.
 * @property {string} endDate - End date and time of the interview.
 * @property {number} fullCount - Total number of questions in the interview.
 * @property {number} successCount - Number of correct answers.
 * @property {Array<string>} skills - Array of skills related to the interview.
 * @property {Answers} response - Object containing the interview response.
 */

export interface QuizHistoryResponse {
	id: string;
	profileId: string;
	endDate: string;
	startDate: string;
	fullCount: number;
	skills: string[];
	response: Answers;
	successCount: number;
}

export interface Response {
	answers: Answers[];
}

export interface Answers {
	questionId: number;
	questionTitle: string;
	answer: QuizQuestionAnswerType;
	imageSrc?: string;
	shortAnswer?: string;
}

export interface ActiveQuizState {
	startDate: string;
	questions: Answers[];
}

export interface ChangeQuestionAnswerParams {
	questionId: number;
	answer: QuizQuestionAnswerType;
}

export interface InterviewQuizParams {
	page: number;
	limit: number;
}

export interface InterviewQuizGetRequest {
	profileId?: string;
	params: InterviewQuizParams;
}

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
