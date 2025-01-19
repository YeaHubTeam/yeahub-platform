import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { deleteSkillsApiUrls } from '../model/constants/deleteSkillsConstants';

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
