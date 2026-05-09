import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route, handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getDeleteSkillApiErrorMessage } from '../lib/utils/getDeleteSkillApiErrorMessage';
import { deleteSkillApiUrls } from '../model/constants/deleteSkillConstants';

const deleteSkillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSkill: build.mutation<void, number>({
			query: (skillId) => ({
				url: route(deleteSkillApiUrls.deleteSkill, skillId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.skills.page);
				} catch (error) {
					toast.error(handleApiError(error, getDeleteSkillApiErrorMessage));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SKILLS, ApiTags.SKILL_DETAIL],
		}),
	}),
});

export const { useDeleteSkillMutation } = deleteSkillApi;
