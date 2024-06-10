import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { setProfileDetail } from '../model/slices/authSlice';
import { GetProfileApiResponse } from '../model/types/authTypes';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query<GetProfileApiResponse, void>({
			query: () => 'auth/profile',
			providesTags: [ApiTags.PROFILE_DETAIL],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					const data = result.data;

					dispatch(setProfileDetail(data));
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useGetProfileQuery } = authApi;
