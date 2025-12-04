import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { createTopicApiUrls } from '../model/constants/createTopicConstants';
import { CreateTopicBodyRequest, CreateTopicResponse } from '../model/types/topicCreateTypes';

export const createTopicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createTopic: build.mutation<CreateTopicResponse, CreateTopicBodyRequest>({
			query: (topic) => ({
				url: route(createTopicApiUrls.createTopic),
				method: 'POST',
				body: topic,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.topics.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_TOPIC_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_TOPIC_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TOPICS],
		}),
	}),
});

export const { useCreateTopicMutation } = createTopicApi;
