import { baseApi } from '@/shared/config/api/baseApi';

import { Skill } from '@/entities/skill';

export const deleteSkillsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSkillWithoutErrorHandler: build.mutation<Skill, Skill['id']>({
			query: (skillId) => ({
				url: `/skills/${skillId}`,
				method: 'DELETE',
			}),
		}),
	}),
});
