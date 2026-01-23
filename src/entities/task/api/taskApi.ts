import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { taskApiUrls } from '../model/constants/task';
import {
	ExecuteCodeRequest,
	ExecuteCodeResponse,
	GetTaskByIdResponse,
	GetTasksListParams,
	GetTasksListResponse,
} from '../model/types/task';

const taskApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTasksList: build.query<GetTasksListResponse, GetTasksListParams>({
			query: (params) => ({
				url: taskApiUrls.getTasksList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.TASKS],
		}),
		getTaskById: build.query<GetTaskByIdResponse, string>({
			query: (taskId) => ({
				url: route(taskApiUrls.getTaskById, taskId),
			}),
			providesTags: [ApiTags.TASK_DETAIL],
		}),
		executeCode: build.mutation<ExecuteCodeResponse, ExecuteCodeRequest>({
			query: (body) => ({
				url: taskApiUrls.executeCode,
				method: 'POST',
				body,
			}),
		}),
		testCode: build.mutation<ExecuteCodeResponse, ExecuteCodeRequest>({
			query: (body) => ({
				url: taskApiUrls.testCode,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useGetTasksListQuery,
	useGetTaskByIdQuery,
	useExecuteCodeMutation,
	useTestCodeMutation,
} = taskApi;
