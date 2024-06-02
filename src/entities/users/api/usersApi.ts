import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetUsersApiResponse } from '../model/types/usersTypes';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	tagTypes: ['Users'],
	baseQuery: fetchBaseQuery({
		// baseUrl: 'https://api.test.yeahub.ru/api#/users',
		baseUrl: process.env.API_URL,
	}),
	endpoints: (builder) => ({
		getUsers: builder.query<GetUsersApiResponse, null>({
			query: () => 'users',
			providesTags: ['Users'],
			// async onQueryStarted(initialDateValue, { dispatch, queryFulfilled }) {
			// 	const result = await queryFulfilled;
			// 	const data = result.data;

			// 	const initialValue = initialDateValue ? initialDateValue : [data[0]];

			// 	dispatch(setUsersList(data));
			// },
		}),
		getUser: builder.query<GetUsersApiResponse, string>({
			query: (id) => `user${id}.json`,
			// async onQueryStarted(initialDateValue, { dispatch, queryFulfilled }) {
			// 	const result = await queryFulfilled;
			// 	const data = result.data;

			// 	const initialValue = initialDateValue ? initialDateValue : [data[0]];

			// 	dispatch(setUsersList(data));
			// },
		}),
		// createUser: builder.mutation<string, { newUser: NewUser; method?: string }>({
		// 	query: ({ newUser, method = 'POST' }) => {
		// 		return {
		// 			url: 'users',
		// 			method,
		// 			body: newUser,
		// 		};
		// 	},
		// 	invalidatesTags: ['Users'],
		// }),
	}),
});

export const { useGetUsersQuery } = usersApi;
