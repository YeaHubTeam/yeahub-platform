import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { SkillsListParams, Skill } from '../model/types/skill';

const skillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSkillsList: build.query<Response<Skill[]>, SkillsListParams>({
			query: (params) => ({
				url: '/skills',
				params,
			}),
			providesTags: [ApiTags.SKILLS],
		}),
	}),
});

export const { useGetSkillsListQuery } = skillApi;
