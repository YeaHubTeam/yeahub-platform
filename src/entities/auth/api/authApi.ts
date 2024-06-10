import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/config/api/baseQuery';

import { GetProfileApiResponse } from '../model/types/authTypes';

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['Profile'],
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getProfile: builder.query<GetProfileApiResponse, null>({
			query: () => 'auth/profile',
			providesTags: ['Profile'],
		}),
	}),
});

export const { useGetProfileQuery } = authApi;
