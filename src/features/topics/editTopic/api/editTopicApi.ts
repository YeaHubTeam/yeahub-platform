import { ApiTags, baseApi, i18n, Translation, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { editTopicApiUrls } from '../model/constants/editTopicConstants';
import { EditTopicBodyRequest, EditTopicResponse } from '../model/types/topicEditTypes';

export const editTopicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editTopic: build.mutation<EditTopicResponse, EditTopicBodyRequest>({
			query: (topic) => ({
				url: route(editTopicApiUrls.editTopic, topic.id),
				method: 'PATCH',
				body: topic,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.topics.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_TOPIC_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_TOPIC_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TOPICS, ApiTags.TOPICS_DETAIL],
		}),
	}),
});

export const { useEditTopicMutation } = editTopicApi;
