import type { ExecuteCodeResponse } from '@/entities/task';

export interface TaskWorkspaceProps {
	code: string;
	languageId: number;
	supportedLanguages: Array<{ id: number; name: string }>;
	isExecuting: boolean;
	isTesting: boolean;
	output: ExecuteCodeResponse | null;
	onCodeChange: (code: string) => void;
	onLanguageChange: (languageId: number) => void;
	onReset: () => void;
	onRun: () => void;
	onSubmit: () => void;
}

export type OutputTabId = 'result' | 'tests';

export type TaskOutputProps = {
	result: ExecuteCodeResponse | null;
};
