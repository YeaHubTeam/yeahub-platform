import { createAsyncThunk } from '@reduxjs/toolkit';

import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteTopicsApi } from '../../api/deleteTopicsApi';

export const deleteMultipleTopicsThunk = createAsyncThunk<void, SelectedAdminEntities>(
	'topics/deleteMultiple',
	async (topics, { rejectWithValue, dispatch }) => {
		try {
			const responses = await Promise.allSettled(
				topics.map(
					async (topic) =>
						await dispatch(deleteTopicsApi.endpoints.deleteTopicOfMultiply.initiate(topic.id)),
				),
			);

			dispatch(baseApi.util.invalidateTags([ApiTags.TOPICS, ApiTags.TOPICS_DETAIL]));

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const successfulDeletions = responses.filter((response: any) => !response.value.error);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const failedDeletions = responses.filter((response: any) => !!response.value.error);

			if (failedDeletions.length === 1 && successfulDeletions.length === 0) {
				toast.error(i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_FAILED));
				return;
			}

			if (successfulDeletions.length === 1 && failedDeletions.length === 0) {
				toast.success(`${i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_SUCCESS)}`);
				return;
			}

			if (successfulDeletions.length >= 1) {
				toast.success(
					`${i18n.t(Translation.TOAST_TOPIC_DELETE_MULTIPLE_SUCCESS)} ${successfulDeletions.length}`,
				);
			}

			if (failedDeletions.length > 0) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				failedDeletions.forEach((_: any, index: number) => {
					toast.error(
						`${i18n.t(Translation.TOAST_TOPIC_DELETE_MULTIPLE_FAILED)} ${topics[index].title}`,
					);
				});
			}
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
		}
	},
);
