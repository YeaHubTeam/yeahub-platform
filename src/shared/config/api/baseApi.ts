import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { RootState } from '@/app/providers/store';

import { ApiTags } from './apiTags';

export const baseApi = createApi({
	tagTypes: Object.values(ApiTags),
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL,
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const accessToken = (getState() as RootState).auth.accessToken;

			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`);
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
});
