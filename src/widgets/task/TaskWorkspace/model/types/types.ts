import type { ExecuteCodeResponse } from '@/entities/task';

export type OutputTabId = 'result' | 'tests';

export type TaskOutputProps = {
	result: ExecuteCodeResponse | null;
};
