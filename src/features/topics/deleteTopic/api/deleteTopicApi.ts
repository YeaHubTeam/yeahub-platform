import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { Topic } from '@/entities/topic';

import { deleteTopicApiUrls } from '../model/constants/deleteTopicConstants';

const deleteTopicApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		deleteTopic: builder.mutation<void, Topic['id']>({
			query: (topicId) => ({
				url: route(deleteTopicApiUrls.deleteTopic, topicId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.topics.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TOPICS, ApiTags.TOPIC_DETAIL],
		}),
	}),
});

export const { useDeleteTopicMutation } = deleteTopicApi;
