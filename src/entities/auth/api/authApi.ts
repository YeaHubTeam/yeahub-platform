import { baseApi } from '@/shared/config/api/baseApi';
import { ROUTES } from '@/shared/config/router/routes';
import { removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';

import { LS_ACCESS_TOKEN_KEY } from '../model/constants/authConstants';
import {
	Auth,
	ExtraArgument,
	GetAuthResponse,
	GetProfileResponse,
	SignUp,
} from '../model/types/auth';

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<GetAuthResponse, Auth>({
			query: (auth) => ({
				url: 'auth/login',
				method: 'POST',
				body: auth,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate('/');
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					if (error?.error?.status === 401) {
						await dispatch(authApi.endpoints.refresh.initiate());
					} else {
						// eslint-disable-next-line no-console
						console.log('Ошибка', error);
					}
				}
			},
		}),
		register: build.mutation<GetAuthResponse, SignUp>({
			query: (registration) => ({
				url: 'auth/signUp',
				method: 'POST',
				body: registration,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate('/');
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					if (error?.error?.status === 401) {
						await dispatch(authApi.endpoints.refresh.initiate());
					} else {
						// eslint-disable-next-line no-console
						console.log('Ошибка', error);
					}
				}
			},
		}),
		profile: build.query<GetProfileResponse, void>({
			query: () => 'auth/profile',
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					if (error?.error?.status === 401) {
						await dispatch(authApi.endpoints.refresh.initiate());
						await dispatch(authApi.endpoints.profile.initiate());
					} else {
						// eslint-disable-next-line no-console
						console.log('Ошибка', error);
					}
				}
			},
		}),
		logout: build.query<void, void>({
			query: () => 'auth/logout',
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					removeFromLS(LS_ACCESS_TOKEN_KEY);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.auth.login.page);
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					if (error?.error.status === 401) {
						const typedExtra = extra as ExtraArgument;
						typedExtra.navigate(ROUTES.auth.login.page);
					} else {
						// eslint-disable-next-line no-console
						console.log('Ошибка', error);
					}
				}
			},
		}),
		refresh: build.query<GetAuthResponse, void>({
			query: () => 'auth/refresh',
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					if (error?.error.status === 401) {
						const typedExtra = extra as ExtraArgument;
						typedExtra.navigate(ROUTES.auth.login.page);
					} else {
						// eslint-disable-next-line no-console
						console.log('Ошибка', error);
					}
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useProfileQuery,
	useLazyLogoutQuery,
	useLazyRefreshQuery,
} = authApi;
