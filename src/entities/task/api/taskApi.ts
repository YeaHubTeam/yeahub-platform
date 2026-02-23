import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { taskApiUrls } from '../model/constants/task';
import {
	ExecuteCodeRequest,
	ExecuteCodeResponse,
	GetTaskByIdResponse,
	GetTaskCategoriesResponse,
	GetTasksListParams,
	GetTasksListResponse,
	GetTasksProfileSolutionsParamRequest,
	GetTasksProfileSolutionsResponse,
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
		getTasksProfileSolutions: build.query<
			GetTasksProfileSolutionsResponse,
			GetTasksProfileSolutionsParamRequest
		>({
			query: ({ taskId, profileId }) => ({
				url: route(taskApiUrls.getTasksProfileSolutions, taskId, profileId),
			}),
			providesTags: [ApiTags.TASK_SOLUTIONS],
		}),
		executeCode: build.mutation<ExecuteCodeResponse, ExecuteCodeRequest>({
			query: (body) => ({
				url: taskApiUrls.executeCode,
				method: 'POST',
				body,
			}),
			invalidatesTags: [ApiTags.TASK_SOLUTIONS, ApiTags.TASKS, ApiTags.TASK_DETAIL],
		}),
		testCode: build.mutation<ExecuteCodeResponse, ExecuteCodeRequest>({
			query: (body) => ({
				url: taskApiUrls.testCode,
				method: 'POST',
				body,
			}),
			invalidatesTags: [ApiTags.TASKS, ApiTags.TASK_DETAIL],
		}),
		getTaskCategories: build.query<GetTaskCategoriesResponse, void>({
			query: () => ({
				url: taskApiUrls.getTaskCategories,
			}),
			providesTags: [ApiTags.TASK_CATEGORIES],
		}),
	}),
});

export const {
	useGetTasksListQuery,
	useGetTaskByIdQuery,
	useExecuteCodeMutation,
	useTestCodeMutation,
	useGetTasksProfileSolutionsQuery,
	useGetTaskCategoriesQuery,
} = taskApi;
