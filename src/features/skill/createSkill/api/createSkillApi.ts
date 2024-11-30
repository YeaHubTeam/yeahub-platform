import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { createSkillApiUrls } from '../model/constants/createSkillConstants';
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
