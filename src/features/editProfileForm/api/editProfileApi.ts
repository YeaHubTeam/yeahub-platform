import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { EditProfileValues } from '../model/types/editProfileTypes';

export const editProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<void, EditProfileValues & { id: string }>({
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

export const { useUpdateProfileMutation } = editProfileApi;
