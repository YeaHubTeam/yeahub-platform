import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { skillApiUrls } from '../model/constants/skillConstants';
import type {
	GetSkillByIdParamsRequest,
	GetSkillByIdResponse,
	GetSkillsListParamsRequest,
	GetSkillsListResponse,
	PopularSkillsResponse,
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
		getPopularSkills: build.query<
			PopularSkillsResponse,
			Pick<PopularSkillsResponse, 'limit' | 'page' | 'specializationId'>
		>({
			query: (params) => ({
				url: skillApiUrls.popularSkills,
				params,
			}),
			providesTags: [ApiTags.POPULAR_SKILLS],
		}),
	}),
});

export const { useGetSkillsListQuery, useGetSkillByIdQuery, useGetPopularSkillsQuery } = skillApi;
