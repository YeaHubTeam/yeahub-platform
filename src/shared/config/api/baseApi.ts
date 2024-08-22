import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken } from '@/shared/helpers/getAccessToken';

import { ApiTags } from './apiTags';

export const baseApi = createApi({
	tagTypes: Object.values(ApiTags),
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			const accessToken = getAccessToken();

			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`);
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
});
