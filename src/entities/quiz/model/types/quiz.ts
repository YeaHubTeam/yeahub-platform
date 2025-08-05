import { Response } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Question } from '@/entities/question';

export type QuestionModeType = 'REPEAT' | 'NEW' | 'RANDOM';
export type QuizQuestionAnswerType = 'KNOWN' | 'UNKNOWN';

export interface Quiz {
	id: string;
	profileId: string;
	quizNumber: number;
	startDate: string;
	endDate: string;
	fullCount: number;
	successCount: number;
	skills: string[];
	response: QuizResponse;
	questions: Question[];
}

export type QuizWithoutQuestions = Omit<Quiz, 'questions'>;

export interface QuizResponse {
	answers: Answers[];
}

export interface Answers {
	questionId: number;
	questionTitle: string;
	answer: QuizQuestionAnswerType;
	imageSrc?: string;
	shortAnswer: string;
	isFavorite?: boolean;
}

export interface ActiveQuizState {
	questions: Answers[];
}

export interface ChangeQuestionAnswerParams {
	questionId: number;
	profileId: string;
	answer: QuizQuestionAnswerType;
	shouldSaveToLS?: boolean;
}

export interface ProgressByCategoriesData {
	category: string;
	passed: number;
	total: number;
	value: number;
}

export interface ProfileQuizzesStat {
	quizzesCount: number;
	maxQuizResult: number;
	minQuizResult: number;
	avgQuizResult: number;
}
export interface ProfileQuestionsStat {
	uniqueQuestionsCount: number;
	learnedQuestionsCount: number;
	unlearnedQuestionsCount: number;
	inProgressQuestionsCount: number;
}

export interface ProfileSkillsStat {
	fullSkillsQuestionsMap: {
		skill: string;
		count: number;
	}[];
	learnedSkillsQuestionsMap: {
		skill: string;
		count: number;
	}[];
}

export interface CreateNewQuizParamsRequest {
	profileId: string;
	skills?: number[];
	complexity?: number[];
	collection?: number;
	limit?: number;
	mode?: QuestionModeType;
}
export type CreateNewQuizResponse = Omit<Quiz, 'endDate'>;

export type interruptQuizRequest = {
	data: CreateNewQuizResponse;
	isInterrupted?: boolean;
};

export interface CreateNewMockQuizParamsRequest
	extends Omit<CreateNewQuizParamsRequest, 'profileId'> {
	specialization?: number[] | number;
}

export type CreateNewMockQuizResponse = Omit<CreateNewQuizResponse, 'profileId'>;

export type GetActiveQuizResponse = Response<Omit<Quiz, 'endDate'>[]>;
export interface GetActiveQuizParamsRequest {
	profileId: string;
	page: number;
	limit: number;
}

export type GetQuizHistoryResponse = Response<QuizWithoutQuestions[]>;
export interface GetQuizHistoryParamsRequest {
	profileId: string;
	page?: number;
	limit?: number;
	startAfter?: string;
	startBefore?: string;
	fullCount?: number;
	successCount?: number;
	skills?: string[];
}

export type GetQuizByProfileIdResponse = Quiz;
export interface GetQuizByProfileIdParamsRequest {
	profileId: string;
	quizId: string;
}

export interface GetProfileQuizStatsResponse {
	quizzesStat: ProfileQuizzesStat;
	questionsStat: ProfileQuestionsStat;
	skillsStat: ProfileSkillsStat;
}
