import { API_VERSION } from '@/shared/config';

export const deleteTaskApiUrls = {
	deleteTask: `${API_VERSION.V1}/live-coding/tasks/:taskId`,
};
