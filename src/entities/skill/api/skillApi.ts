import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { skillApiUrls } from '../model/constants/skillConstants';
import type {
	GetSkillByIdParamsRequest,
	GetSkillByIdResponse,
	GetSkillsListParamsRequest,
	GetSkillsListResponse,
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
		getSkillById: build.query<GetSkillByIdResponse, GetSkillByIdParamsRequest>({
			query: ({ skillId }) => ({
				url: route(skillApiUrls.getSkillById, skillId),
			}),
			providesTags: [ApiTags.SKILL_DETAIL],
		}),
	}),
});

export const { useGetSkillsListQuery, useGetSkillByIdQuery } = skillApi;
