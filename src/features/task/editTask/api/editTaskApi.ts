import { ApiTags, baseApi, i18n, Translation, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { editTaskApiUrls } from '../model/constants/editTaskConstants';
import { EditTaskBodyRequest, EditTaskResponse } from '../model/types/taskEditTypes';

export const editTaskApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editTask: build.mutation<EditTaskResponse, EditTaskBodyRequest>({
			query: (task) => ({
				url: route(editTaskApiUrls.editTask, task.id),
				method: 'PUT',
				body: task,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.tasks.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_TASKS_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_TASKS_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TASKS, ApiTags.TASK_DETAIL],
		}),
	}),
});

export const { useEditTaskMutation } = editTaskApi;
