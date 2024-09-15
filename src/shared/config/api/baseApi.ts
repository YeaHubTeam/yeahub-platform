import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';

import { apiAccessTokenIsBrokenEvent } from './apiAccessTokenIsBrokenEvent';
import { ApiTags } from './apiTags';

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	credentials: 'include',
	prepareHeaders: (headers) => {
		const accessToken = getFromLS(LS_ACCESS_TOKEN_KEY);

		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`);
		}

		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401 && args.url !== '/auth/refresh') {
		api.dispatch(apiAccessTokenIsBrokenEvent());
	}

	return result;
};

export const baseApi = createApi({
	tagTypes: Object.values(ApiTags),
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});
