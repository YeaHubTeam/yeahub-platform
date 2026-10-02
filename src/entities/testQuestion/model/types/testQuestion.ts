import { Response } from '@/shared/libs';

export interface TestQuestion {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	keywords: string[];
	status: 'draft' | 'public';
	rate: number;
	complexity: number;
	variants: Record<string, string>;
	successVariants: string[];
	createdAt: string;
	updatedAt: string;
	createdById: string;
	updatedById: string;
	createdBy: unknown;
	updatedBy: unknown;
	questionSpecializations: TestQuestionSpecialization[];
	questionSkills: TestQuestionSkill[];
}

export interface TestQuestionSpecialization {
	id: number;
	name: string;
}

export interface TestQuestionSkill {
	id: number;
	name: string;
}

export type GetTestQuestionKeywordsParamsRequest = {
	page?: number;
	limit?: number;
	title?: string;
};

export type GetTestQuestionKeywordsResponse = Response<string[]>;
