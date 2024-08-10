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

/**
 * Модель запроса на получение истории собеседований
 * @property {string} profileID - Идентификатор профиля пользователя. (не id пользователя)
 * @property {QuizHistoryParams} params - Параметры викторины для запроса истории.
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
 *Модель ответа на получение истории собеседований
 
 * @property {string} id - Уникальный идентификатор истории собеседования.
 * @property {string} profileId - Идентификатор профиля пользователя.
 * @property {string} startDate - Дата и время начала собеседования.
 * @property {string} endDate - Дата и время окончания собеседования.
 * @property {number} fullCount - Общее количество вопросов собеседования.
 * @property {number} successCount - Количество правильных ответов.
 * @property {Array<string>} skills - Массив навыков, связанных с собеседованием.
 * @property {Answers} response - Объект ответа на собеседование.
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
