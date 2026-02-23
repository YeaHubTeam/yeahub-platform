import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteTaskApiUrls } from '../model/constants/deleteTaskConstants';

const deleteTaskApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteTask: build.mutation<void, string>({
			query: (taskId) => ({
				url: route(deleteTaskApiUrls.deleteTask, taskId),
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.TASKS, ApiTags.TASK_DETAIL],
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_TASKS_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.tasks.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_TASKS_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useDeleteTaskMutation } = deleteTaskApi;
