import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	credentials: 'include',
	prepareHeaders: (headers) => {
		const accessToken = localStorage.getItem('accessToken');

		accessToken && headers.set('Authorization', `Bearer ${accessToken}`);

		return headers;
	},
});
