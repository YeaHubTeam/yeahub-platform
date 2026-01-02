import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createSkillApiUrls } from '../lib/constants/createSkillConstants';
import { CreateSkillBodyRequest, CreateSkillResponse } from '../model/types/skillCreateTypes';

export const createSkillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createSkill: build.mutation<CreateSkillResponse, CreateSkillBodyRequest>({
			query: (skill) => ({
				url: createSkillApiUrls.createSkill,
				method: 'POST',
				body: skill,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.skills.detail.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_SKILL_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_SKILL_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SKILLS],
		}),
	}),
});

export const { useCreateSkillMutation } = createSkillApi;
