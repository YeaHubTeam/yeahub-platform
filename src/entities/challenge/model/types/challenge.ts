import { Response } from '@/shared/libs';

export type ChallengeStatus = 'SOLVED' | 'UNSOLVED';

export interface ChallengeListItem {
	id: string;
	name: string;
	slug: string;
	difficulty: number;
	supportedLanguagesIds: number[];
	status: ChallengeStatus;
	mainCategory: string;
	canSolve: boolean;
}

export interface TestCase {
	input: Record<string, unknown>;
	expected_output: unknown;
	is_hidden: boolean;
}

export interface TaskStructure {
	languageId: number;
	solutionTemplate: string;
	testFixture: string;
}

export interface Challenge {
	id: string;
	name: string;
	slug: string;
	description: string;
	difficulty: number;
	langIds: number[];
	categoryId: number;
	constraints: string[];
	testCases: TestCase[];
	taskStructures: TaskStructure[];
	solutionSignature: string;
}

export interface GetChallengesListParams {
	page?: number;
	limit?: number;
	id?: string;
	name?: string;
	slug?: string;
	difficulty?: number;
	categoryId?: number;
	langIds?: number[];
	isActive?: boolean;
	search?: string;
	sortBy?: 'name' | 'difficulty' | 'createdAt' | 'updatedAt';
	sortOrder?: 'ASC' | 'DESC';
}

export type GetChallengesListResponse = Response<ChallengeListItem[]>;

export type GetChallengeByIdResponse = Challenge;
