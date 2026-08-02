import { createAsyncThunk } from '@reduxjs/toolkit';

import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteTasksApi } from '../../api/deleteTasksApi';

export const deleteMultipleTasksThunk = createAsyncThunk<void, SelectedAdminEntities<string>>(
	'tasks/deleteMultiple',
	async (tasks, { rejectWithValue, dispatch }) => {
		try {
			const responses = await Promise.allSettled(
				tasks.map(
					async (task) =>
						await dispatch(deleteTasksApi.endpoints.deleteTasksOfMultiply.initiate(task.id)),
				),
			);

			dispatch(baseApi.util.invalidateTags([ApiTags.TASKS, ApiTags.TASK_DETAIL]));

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const successfulDeletions = responses.filter((response: any) => !response.value.error);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const failedDeletions = responses.filter((response: any) => !!response.value.error);

			if (failedDeletions.length === 1 && successfulDeletions.length === 0) {
				toast.error(i18n.t(Translation.TOAST_TASKS_DELETE_SINGLE_FAILED));
				return;
			}

			if (successfulDeletions.length === 1 && failedDeletions.length === 0) {
				toast.success(i18n.t(Translation.TOAST_TASKS_DELETE_SINGLE_SUCCESS));
				return;
			}

			if (successfulDeletions.length >= 1) {
				toast.success(
					`${i18n.t(Translation.TOAST_TASKS_DELETE_MULTIPLE_SUCCESS)}
					${successfulDeletions.length}`,
				);
			}

			if (failedDeletions.length > 0) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				responses.forEach((response: any, index: number) => {
					if (response.value.error) {
						toast.error(
							`${i18n.t(Translation.TOAST_TASKS_DELETE_MULTIPLE_FAILED)} ${tasks[index].title}`,
						);
					}
				});
			}
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
		}
	},
);
