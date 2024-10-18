import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Skill, SkillFormValues } from '@/entities/skill';

export const createSkillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createSkill: build.mutation<Skill, SkillFormValues>({
			query: (skill) => ({
				url: `/skills`,
				method: 'POST',
				body: skill,
			}),
			invalidatesTags: [ApiTags.SKILLS],
		}),
	}),
});

export const { useCreateSkillMutation } = createSkillApi;
