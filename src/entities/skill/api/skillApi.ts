import toast from 'react-hot-toast';

import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { route } from '@/shared/helpers/route';

import { skillApiUrls } from '../model/constants/skillConstants';
import type {
	GetSkillByIdResponse,
	GetSkillsListParamsRequest,
	GetSkillsListResponse,
	UpdateSkillIconParamsRequest,
} from '../model/types/skill';

const skillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSkillsList: build.query<GetSkillsListResponse, GetSkillsListParamsRequest>({
			query: (params) => ({
				url: skillApiUrls.getSkillsList,
				params,
			}),
			providesTags: [ApiTags.SKILLS],
		}),
		getSkillById: build.query<GetSkillByIdResponse, string>({
			query: (skillId) => ({
				url: route(skillApiUrls.getSkillById, skillId),
			}),
			providesTags: [ApiTags.SKILL_DETAIL],
		}),
		updateSkillIcon: build.mutation<void, UpdateSkillIconParamsRequest>({
			query: ({ id, image }) => {
				const body = image ? { skillImage: image } : { imageSrc: null, skillImage: null };
				return {
					url: `/skills/${id}`,
					body,
					method: 'PATCH',
				};
			},
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_SKILL_EDIT_SUCCESS));
				} catch (err) {
					toast.error(i18n.t(Translation.TOAST_SKILL_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.log(err);
				}
			},
			invalidatesTags: [ApiTags.SKILLS, ApiTags.SKILL_DETAIL],
		}),
	}),
});

export const { useGetSkillsListQuery, useGetSkillByIdQuery, useUpdateSkillIconMutation } = skillApi;
