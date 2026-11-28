import { ApiTags, baseApi, ExtraArgument, i18n, ROUTES, Translation } from '@/shared/config';
import { handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getCreateTopicApiErrorMessage } from '../lib/utils/getCreateTopicApiErrorMessage';
import { createTopicApiUrls } from '../model/constants/createTopicConstans';
import { CreateTopicBodyRequest, CreateTopicResponse } from '../model/types/topicCreateTypes';

export const createTopicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createTopic: build.mutation<CreateTopicResponse, CreateTopicBodyRequest>({
			query: (topic) => ({
				url: createTopicApiUrls.createTopic,
				method: 'POST',
				body: topic,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.admin.topics.page);
					toast.success(i18n.t(Translation.TOAST_TOPIC_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getCreateTopicApiErrorMessage)));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TOPICS],
		}),
	}),
});

export const { useCreateTopicMutation } = createTopicApi;
