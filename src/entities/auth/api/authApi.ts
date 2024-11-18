import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';
import { toast } from '@/shared/ui/Toast';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { profileActions } from '@/entities/profile';

import { authApiUrls } from '../model/constants/authConstants';
import {
	ExtraArgument,
	LoginBodyRequest,
	LoginResponse,
	ProfileResponse,
	RefreshResponse,
	SignUpBodyRequest,
	SignUpResponse,
} from '../model/types/auth';

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginBodyRequest>({
			query: (body) => ({
				url: authApiUrls.login,
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.platformRoute);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_AUTH_LOGIN_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		register: build.mutation<SignUpResponse, SignUpBodyRequest>({
			query: (body) => ({
				url: authApiUrls.register,
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled, extra, dispatch }) {
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					const typedExtra = extra as ExtraArgument;

					dispatch(profileActions.setEmailSent(true));

					typedExtra.navigate(ROUTES.platformRoute);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		profile: build.query<ProfileResponse, void>({
			query: () => authApiUrls.profile,
			providesTags: [ApiTags.PROFILE],
		}),
		logout: build.query<void, void>({
			query: () => authApiUrls.logout,
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
		refresh: build.query<RefreshResponse, void>({
			query: () => authApiUrls.refresh,
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
