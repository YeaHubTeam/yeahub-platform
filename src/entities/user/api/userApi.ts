import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import type { UserInfoProfile } from '../model/types/userInfo';

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<void, UserInfoProfile & { id: string }>({
			query: ({ id, ...userInfo }) => ({
				url: `profiles/${id}`,
				body: userInfo,
				method: 'PUT',
				providesTags: [ApiTags.PROFILE_DETAIL],
			}),
			invalidatesTags: (_result, _error, { id }) => [{ type: ApiTags.PROFILE_DETAIL, id }],
		}),
	}),
});

export const { useUpdateProfileMutation } = userApi;
