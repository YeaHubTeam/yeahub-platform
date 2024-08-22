import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { manageLocalStorage } from '@/shared/helpers/manageLocalStorage';

import { ApiTags } from './apiTags';

const { getStoredItem } = manageLocalStorage('accessToken');

export const baseApi = createApi({
	tagTypes: Object.values(ApiTags),
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			const accessToken = getStoredItem();

			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`);
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
});
