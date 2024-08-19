import { baseApi } from '@/shared/config/api/baseApi';
import { GetLoginError } from '@/shared/types/types';

import { authActions } from '../model/slices/authSlice';
import { Auth, GetAuthResponse, GetProfileResponse, SignUp } from '../model/types/auth';

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<GetAuthResponse, Auth>({
			query: (auth) => ({
				url: 'auth/login',
				method: 'POST',
				body: auth,
			}),
			async onQueryStarted(_auth, { dispatch, queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					dispatch(authActions.setProfile(result.data.user));
					dispatch(authActions.setAccessToken(result.data));
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					extra.navigate('/');
				} catch (error) {
					const status = (error as unknown as GetLoginError).error.status;
					dispatch(authActions.catchError(status));
				}
			},
		}),
		signUp: build.mutation<GetAuthResponse, SignUp>({
			query: (registration) => ({
				url: 'auth/signUp',
				method: 'POST',
				body: registration,
			}),
			async onQueryStarted(_auth, { dispatch, queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					dispatch(authActions.setProfile(result.data.user));
					dispatch(authActions.setAccessToken(result.data));
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					extra.navigate('/');
				} catch (error) {
					const status = (error as unknown as GetLoginError).error.status;
					dispatch(authActions.catchError(status));
				}
			},
		}),
		profile: build.query<GetProfileResponse, void>({
			query: () => 'auth/profile',
			async onQueryStarted(_auth, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(authActions.setProfile(result.data));
				} catch (error) {
					const status = (error as unknown as GetLoginError).error.status;
					dispatch(authActions.catchError(status));
				}
			},
		}),
		logout: build.query<void, void>({
			query: () => 'auth/logout',
			async onQueryStarted(_auth, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(authActions.logOut());
				} catch (error) {
					const status = (error as unknown as GetLoginError).error.status;
					dispatch(authActions.catchError(status));
				}
			},
		}),
		getRefreshToken: build.query<GetAuthResponse, void>({
			query: () => 'auth/refresh',
			async onQueryStarted(_auth, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(authActions.setAccessToken(result.data));
					dispatch(authActions.setProfile(result.data.user));
				} catch (error) {
					const status = (error as unknown as GetLoginError).error.status;
					dispatch(authActions.catchError(status));
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useSignUpMutation,
	useProfileQuery,
	useLazyLogoutQuery,
	useLazyGetRefreshTokenQuery,
} = authApi;
