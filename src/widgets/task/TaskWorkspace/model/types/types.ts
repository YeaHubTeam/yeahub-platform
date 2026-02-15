export type OutputTabId = 'result' | 'tests';

export type TaskTestCaseResultTestStatus = 'PASS' | 'FAIL';

export interface TaskTestCaseResultTest {
	inputs: unknown[];
	expected: unknown;
	result: unknown;
	status: TaskTestCaseResultTestStatus;
}

export interface TaskTestCaseResultSummary {
	failed: number;
	passed: number;
	total: number;
	success: boolean;
}

export interface TaskTestCaseResult {
	summary: TaskTestCaseResultSummary;
	tests: TaskTestCaseResultTest[];
}
