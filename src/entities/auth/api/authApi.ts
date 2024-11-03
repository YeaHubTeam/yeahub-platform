import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { userActions } from '@/entities/profile';

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
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.platformRoute);
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
			async onQueryStarted(_, { queryFulfilled, extra, dispatch }) {
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					const typedExtra = extra as ExtraArgument;

					dispatch(userActions.setEmailSent(true));

					typedExtra.navigate(ROUTES.platformRoute);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		profile: build.query<GetProfileResponse, void>({
			query: () => 'auth/profile',
			providesTags: [ApiTags.PROFILE],
		}),
		logout: build.query<void, void>({
			query: () => 'auth/logout',
			async onQueryStarted(_, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					removeFromLS(LS_ACCESS_TOKEN_KEY);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.auth.login.page);
					dispatch(baseApi.util.resetApiState());
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
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
					removeFromLS(LS_ACCESS_TOKEN_KEY);
					// const typedExtra = extra as ExtraArgument;
					// typedExtra.navigate(ROUTES.auth.login.page);
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
