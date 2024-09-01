// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';

export type QuestionType = 'task' | 'question' | 'test';

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
	createdAt: string;
	updatedAt: string;
	createdBy: null | string;
	updatedBy: null;
	checksCount?: number;
	//todo убрать specializations, skills и rating так как это замоканные данные
	questionSpecializations?: Skill[];
	questionSkills?: Skill[];
	complexity?: number;
	specializations: number[];
	skills: number[];
	rating: number;
}

export interface QuestionsListParams {
	page?: number;
	limit?: number;
	title?: string;
	titleOrDescription?: string;
	rate?: number[]; //complexity
	rating?: number[]; //rate
	specialization?: number | number[];
	progressStatus?: number[]; //not implemented
	complexity?: number[]; //not implemented
}

export interface QuestionByIdParams {
	questionId?: string;
	profileId?: string;
}
