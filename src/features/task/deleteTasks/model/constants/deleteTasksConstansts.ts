import { API_VERSION } from '@/shared/config';

export const deleteTasksApiUrls = {
	deleteTask: `${API_VERSION.V1}/live-coding/tasks/:taskId`,
};
