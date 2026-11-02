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
export interface FinishedTestAnswer extends TestAnswer {
	isCorrect: boolean;
}

export interface FinishedTestQuestion extends Omit<TestQuestion, 'createdBy' | 'updatedBy'> {
	successVariants: string[];
	passedCount?: number;
	isLearned?: boolean;
	lastUpdate?: string;
	profileId?: string;
	questionId?: number;
	createdBy?: TestAuthor | string | null;
	updatedBy?: TestAuthor | string | null;
}

export interface GetFinishedTestDataParamsRequest {
	profileId: string;
	testId: string;
}

export interface GetFinishedTestDataResponse {
	id: string;
	profileId: string;
	testNumber: number;
	startDate: string;
	endDate: string;
	fullCount: number;
	successCount: number;
	skills: string[];
	response: {
		answers: FinishedTestAnswer[];
	};
	questions: FinishedTestQuestion[];
}

export type ActiveTests = Record<string, TestAnswer[]>;
