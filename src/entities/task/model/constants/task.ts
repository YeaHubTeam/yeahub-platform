import { API_VERSION } from '@/shared/config';

export const taskApiUrls = {
	getTasksList: `${API_VERSION.V1}/live-coding/tasks`,
	getTaskById: `${API_VERSION.V1}/live-coding/tasks/:taskId`,
	executeCode: `${API_VERSION.V1}/live-coding/tasks/execute`,
	testCode: `${API_VERSION.V1}/live-coding/tasks/test`,
};

export const LANGUAGE_IDS = {
	JAVASCRIPT: 63,
} as const;
