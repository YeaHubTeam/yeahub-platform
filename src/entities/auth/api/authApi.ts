import { baseApi } from '@/shared/config/api/baseApi';
import { manageLocalStorage } from '@/shared/helpers/manageLocalStorage';

import {
	Auth,
	ExtraArgument,
	GetAuthResponse,
	GetProfileResponse,
	SignUp,
} from '../model/types/auth';

const { setStoredItem, removeStoredItem } = manageLocalStorage('accessToken');

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<GetAuthResponse, Auth>({
			query: (auth) => ({
				url: 'auth/login',
				method: 'POST',
				body: auth,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					setStoredItem(result.data.access_token);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate('/');
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		register: build.mutation<GetAuthResponse, SignUp>({
			query: (registration) => ({
				url: 'auth/signUp',
				method: 'POST',
				body: registration,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					setStoredItem(result.data.access_token);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate('/');
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		profile: build.query<GetProfileResponse, void>({
			query: () => 'auth/profile',
		}),
		logout: build.query<void, void>({
			query: () => 'auth/logout',
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					removeStoredItem();
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		refresh: build.query<GetAuthResponse, void>({
			query: () => 'auth/refresh',
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					setStoredItem(result.data.access_token);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
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
