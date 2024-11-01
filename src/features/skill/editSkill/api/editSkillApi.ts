import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Skill } from '@/entities/skill';

const editSkillApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editSkill: build.mutation<Skill, Skill>({
			query: (skill) => ({
				url: `/skills/${skill.id}`,
				method: 'PATCH',
				body: skill,
			}),
			invalidatesTags: [ApiTags.SKILLS, ApiTags.SKILL_DETAIL],
		}),
	}),
});

export const { useEditSkillMutation } = editSkillApi;
