import { Response, SortOrder } from '@/shared/libs';

import { ProgrammingLanguage } from '@/entities/programmingLanguage/@x/task';

export type TaskStatus = 'solved' | 'attempted' | 'not_started';
export type TaskDifficulty = 1 | 2 | 3 | 4 | 5;

export interface TestCase {
	input: Record<string, unknown>;
	expected_output: unknown;
	is_hidden: boolean;
}

export interface TaskStructure {
	languageId: number;
	solutionStub: string;
	testFixture: string;
	preloadedCode?: string | null;
	isActive: boolean;
}

export type TaskSubscriptionLevel = 'free' | 'premium';

export interface Task {
	id: string;
	name: string;
	slug: string;
	description: string;
	status: TaskStatus;
	difficulty: TaskDifficulty;
	supportedLanguages: ProgrammingLanguage[];
	mainCategory: TaskCategoryCode;
	constraints: string[];
	testCases: TestCase[];
	taskStructures: TaskStructure[];
	solutionSignature: string;
	timeLimit: number;
	memoryLimit: number;
	canSolve: boolean;
	subscriptionLevel: TaskSubscriptionLevel;
}

export type TaskCategoryCode =
	| 'algorithms'
	| 'data-structures'
	| 'databases'
	| 'strings'
	| 'arrays'
	| 'dynamic-programming';

export interface TaskCategory {
	id: number;
	name: string;
	code: TaskCategoryCode;
	description: string;
	parentCode: string | null;
	childrenCodes: TaskCategoryCode[];
	isActive: boolean;
}

export type GetTaskCategoriesResponse = TaskCategory[];

export interface GetTasksListParams {
	page?: number;
	limit?: number;
	id?: string;
	title?: string;
	slug?: string;
	difficulty?: TaskDifficulty;
	category?: TaskCategoryCode;
	langIds?: number[];
	isActive?: boolean;
	search?: string;
	sortBy?: 'name' | 'difficulty' | 'createdAt' | 'updatedAt';
	sortOrder?: SortOrder;
	canSolve?: boolean;
}

export type GetTasksListResponse = Response<Task[]>;

export type GetTaskByIdResponse = Task;

export type GetTasksProfileSolutionsParamRequest = {
	taskId: string;
	profileId: string;
};

export type TaskSolution = {
	id: string;
	profileId: string;
	taskId: string;
	status: TaskStatus;
	attemptsCount: number;
	lastAttemptAt: string;
	solvedAt: string;
	bestExecutionTime: number;
	bestMemoryUsage: number;
	solutionCode: string;
	solutionLanguage: ProgrammingLanguage;
	createdAt: string;
	updatedAt: string;
};

export type GetTasksProfileSolutionsResponse = TaskSolution[];

export interface ExecuteCodeRequest {
	taskId: string;
	sourceCode: string;
	languageId: number;
	profileId?: string;
}

export type OverallStatus = 'ERROR' | 'SUCCESS';

export interface ExecuteCodeResponse {
	overall_status: OverallStatus;
	passed_tests: number;
	total_tests: number;
	success_rate: number;
	total_execution_time: number;
	average_memory_usage: number;
	test_cases: {
		status: string;
		input: unknown;
		expected_output: unknown;
		actual_output: string;
		error_message: string;
		execution_time: number;
		memory_usage: number;
		is_hidden: boolean;
	}[];
	compilation_error: string;
	runtime_output: string;
	task_id: string;
	language_id: number;
	executed_at: string;
}

export type CreateOrEditTaskFormValues = Omit<
	Task,
	| 'slug'
	| 'supportedLanguages'
	| 'status'
	| 'solutionSignature'
	| 'mainCategory'
	| 'testCases'
	| 'canSolve'
	| 'timeLimit'
	| 'memoryLimit'
> & {
	categoryCode: TaskCategoryCode;
};
