import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { deleteSkillsApiUrls } from '../lib/constants/deleteSkillsConstants';

export const deleteSkillsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSkillOfMultiply: build.mutation<void, number>({
			query: (skillId) => ({
				url: route(deleteSkillsApiUrls.deleteSkill, skillId),
				method: 'DELETE',
			}),
		}),
	}),
});
