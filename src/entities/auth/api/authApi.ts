import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { setAccessToken, setProfileDetail } from '../model/slices/authSlice';
import { GetProfileApiResponse, GetRefreshTokenApiResponse } from '../model/types/authTypes';

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
		refreshToken: builder.query<GetRefreshTokenApiResponse, null>({
			query: () => 'auth/refresh',
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					const data = result.data;

					const accessToken = data.access_token;
					const user = data.user;

					dispatch(setAccessToken(accessToken));
					dispatch(setProfileDetail(user));
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		login: builder.mutation<
			GetRefreshTokenApiResponse,
			{ user: { username: string; password: string }; method?: string }
		>({
			query: ({ user, method = 'POST' }) => {
				return {
					url: 'auth/login',
					method,
					body: user,
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					const data = result.data;

					const accessToken = data.access_token;
					const user = data.user;

					dispatch(setAccessToken(accessToken));
					dispatch(setProfileDetail(user));
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		// logout: builder.query<void, void>({
		// 	query: () => 'auth/logout',
		// }),
		logout: builder.mutation<void, void>({
			query: () => {
				return {
					url: 'auth/logout',
					method: 'GET',
				};
			},
			async onQueryStarted(_, { dispatch }) {
				try {
					// const result = await queryFulfilled;
					// const data = result.data;

					// const accessToken = data.access_token;
					// const user = data.user;

					dispatch(setAccessToken(null));
					dispatch(setProfileDetail(null));
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useGetProfileQuery, useRefreshTokenQuery, useLoginMutation, useLogoutMutation } =
	authApi;
