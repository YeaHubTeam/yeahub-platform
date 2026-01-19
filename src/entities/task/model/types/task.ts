import { Response, SortOrder } from '@/shared/libs';

export type TaskStatus = 'SOLVED' | 'UNSOLVED';

export interface TaskListItem {
	id: string;
	name: string;
	slug: string;
	difficulty: number;
	supportedLanguagesIds: number[];
	status: TaskStatus;
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

export interface Task {
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

export interface GetTasksListParams {
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
	sortOrder?: SortOrder;
}

export type GetTasksListResponse = Response<TaskListItem[]>;

export type GetTaskByIdResponse = Task;

export interface ExecuteCodeRequest {
	taskId: string;
	sourceCode: string;
	languageId: number;
	profileId?: string;
}

export interface ExecuteCodeResponse {
	overall_status: string;
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
