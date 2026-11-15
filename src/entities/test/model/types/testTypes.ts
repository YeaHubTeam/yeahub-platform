import { Response } from '@/shared/libs';

export type TestMode = 'REPEAT' | 'NEW' | 'RANDOM';

export interface CreateTestFilterParams {
	skills?: number[];
	complexity?: number[];
	count?: number;
	mode?: TestMode;
}

export interface CreateNewTestParamsRequest {
	profileId: string;
	skills?: number[];
	complexity?: number[];
	limit: number;
	mode: TestMode;
}

interface TestAuthor {
	id: string;
	username: string;
}

interface TestSpecialization {
	id: number;
	title: string;
	slug: string;
	description: string;
	imageSrc: string | null;
	createdAt: string;
	updatedAt: string;
}

interface TestSkill {
	id: number;
	title: string;
	description: string;
	imageSrc: string | null;
	createdAt: string;
	updatedAt: string;
	specializations: TestSpecialization[];
}

export interface TestQuestion {
	id: number;
	title: string;
	description: string;
	imageSrc: string | null;
	keywords: string[];
	status: 'draft' | 'public';
	rate: number;
	complexity: number;
	variants: Record<string, string>;
	createdAt: string;
	updatedAt: string;
	createdById: string;
	updatedById: string | null;
	createdBy: TestAuthor;
	updatedBy: TestAuthor | null;
	questionSpecializations: TestSpecialization[];
	questionSkills: TestSkill[];
}

export interface TestAnswer {
	questionId: number;
	questionTitle: string;
	answer: string[];
}

export interface CreateNewTestResponse {
	profileId: string;
	fullCount: number;
	skills: string[];
	questions: TestQuestion[];
	response: {
		answers: TestAnswer[];
	};
	testNumber: number;
	startDate: string;
	endDate: string | null;
	successCount: number | null;
	id: string;
}

export type ActiveTests = Record<string, TestAnswer[]>;

export interface TestHistoryAnswer extends TestAnswer {
	isCorrect: boolean;
}

export interface TestHistoryItem {
	id: string;
	profileId: string;
	testNumber: number;
	startDate: string;
	endDate: string;
	fullCount: number;
	successCount: number;
	skills: string[];
	response: {
		answers: TestHistoryAnswer[];
	};
}

export interface GetTestHistoryParamsRequest {
	profileId: string;
	page?: number;
	limit?: number;
	startAfter?: string;
	startBefore?: string;
	fullCount?: number;
	successCount?: number;
	skills?: string[];
}

export type GetTestHistoryResponse = Response<TestHistoryItem[]>;
