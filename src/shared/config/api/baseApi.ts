import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getFromLS } from '@/shared/helpers/manageLocalStorage';

import { ApiTags } from './apiTags';

export const baseApi = createApi({
	tagTypes: Object.values(ApiTags),
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			/*
				TODO: надо 'accessToken' заменить на константу LS_ACCESS_TOKEN_KEY и пофиксить циркулярку
			*/
			const accessToken = getFromLS('accessToken');

			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`);
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
});
