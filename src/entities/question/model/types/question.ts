// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

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
	questionSpecializations?: Specialization[];
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
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	keywords?: string[];
	specialization?: number | number[];
	order?: string;
	orderBy?: string;
	random?: boolean;
}

export interface QuestionsLearnedParams
	extends Omit<QuestionsListParams, 'order' | 'orderBy' | 'random'> {
	profileId?: string;
	isLearned?: boolean;
}

export interface QuestionByIdParams {
	questionId?: string;
	profileId?: string;
}
