import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

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
					toast.error(i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SKILLS, ApiTags.SKILL_DETAIL],
		}),
	}),
});

export const { useDeleteSkillMutation } = deleteSkillApi;
