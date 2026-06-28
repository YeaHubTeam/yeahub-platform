import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { deleteTasksApiUrls } from '../model/constants/deleteTasksConstansts';

export const deleteTasksApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteTasksOfMultiply: build.mutation<void, string>({
			query: (tasksId) => ({
				url: route(deleteTasksApiUrls.deleteTask, tasksId),
				method: 'DELETE',
			}),
		}),
	}),
});
