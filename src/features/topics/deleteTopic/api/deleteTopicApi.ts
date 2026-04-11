import { i18n, Translation, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getDeleteTopicApiErrorMessage } from '../lib/utils/getDeleteTopicApiMessage';

const deleteTopicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteTopic: build.mutation<void, number>({
			query: (topicId) => ({
				url: `/topics/${topicId}`,
				method: 'DELETE',
			}),

			async onQueryStarted(_, { queryFulfilled, extra }) {
				const typedExtra = extra as ExtraArgument;

				try {
					await queryFulfilled;

					toast.success(i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_SUCCESS));

					typedExtra.navigate(ROUTES.admin.topics.page);
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getDeleteTopicApiErrorMessage)));
				}
			},
		}),
	}),
});

export const { useDeleteTopicMutation } = deleteTopicApi;
