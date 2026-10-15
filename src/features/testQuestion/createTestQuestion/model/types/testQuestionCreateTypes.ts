import { TestQuestion } from '@/entities/testQuestion';

export interface CreateTestQuestionFormValues {
	title: string;
	description: string;
	rate: number;
	complexity: number;
	keywords: string[];
	variants: Record<string, string>;
	successVariants: string[];
	specializations: number[];
	skills: number[];
}

export type CreateTestQuestionBodyRequest = CreateTestQuestionFormValues;

export type CreateTestQuestionResponse = TestQuestion;
