import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { editSkillApiUrls } from '../lib/constants/editSkillConstants';
import { EditSkillBodyRequest, EditSkillResponse } from '../model/types/skillEditPageTypes';

const editSkillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editSkill: build.mutation<EditSkillResponse, EditSkillBodyRequest>({
			query: (skill) => ({
				url: route(editSkillApiUrls.editSkill, skill.id),
				method: 'PATCH',
				body: skill,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.skills.detail.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_SKILL_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_SKILL_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SKILLS, ApiTags.SKILL_DETAIL],
		}),
	}),
});

export const { useEditSkillMutation } = editSkillApi;
