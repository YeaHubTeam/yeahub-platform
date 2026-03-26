import { QuestionStatus } from '@/entities/question';

export interface CreateMultipleQuestionsFormValues {
	specializationId: number | null;
	questions: string[];
}

export interface CreateMultipleQuestionsBodyRequest {
	questions: string[];
	specializationId: number;
}

export interface GeneratedQuestionsSuccess {
	generatedDto: GeneratedQuestionDto;
	questionId: number;
}

export interface GeneratedQuestionsWithErrors {
	requestedQuestionText: string;
	generationError: string | null;
	savingError: string | null;
}

export interface GeneratedQuestionDto {
	title: string;
	description: string;
	code: string | null;
	imageSrc: string | null;
	keywords: string[];
	shortAnswer: string;
	longAnswer: string;
	status: QuestionStatus;
	rate: number;
	complexity: number;
	specializations: number[];
	skills: number[];
	topics: number[];
	createdById: string;
	updatedById: string;
}

export interface CreateMultipleQuestionsResponseItem
	extends GeneratedQuestionsSuccess,
		GeneratedQuestionsWithErrors {}

export type CreateMultipleQuestionsResponse = CreateMultipleQuestionsResponseItem[];

export type CreateMultipleQuestionsError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.admin.or.author.required'
	| 'question.user.not.found';
