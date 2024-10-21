import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Skill } from '@/entities/skill';

const deleteSkillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSkill: build.mutation<Skill, Skill['id']>({
			query: (skillId) => ({
				url: `/skills/${skillId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.SKILLS, ApiTags.SKILL_DETAIL],
		}),
	}),
});

export const { useDeleteSkillMutation } = deleteSkillApi;
