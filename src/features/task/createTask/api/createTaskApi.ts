import { ApiTags, baseApi, ExtraArgument, i18n, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createTaskApiUrls } from '../model/constants/createTaskConstants';
import { CreateTaskBodyRequest, CreateTaskResponse } from '../model/types/taskCreateTypes';

export const createTaskApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createTask: build.mutation<CreateTaskResponse, CreateTaskBodyRequest>({
			query: (task) => ({
				url: createTaskApiUrls.createTask,
				method: 'POST',
				body: task,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.tasks.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_TASKS_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_TASKS_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TASKS],
		}),
	}),
});

export const { useCreateTaskMutation } = createTaskApi;
