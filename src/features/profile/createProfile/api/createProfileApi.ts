import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { toast } from '@/shared/ui/Toast';

import { createProfileApiUrls } from '../model/constants/createProfileConstants';
import { CreateProfileRequestData } from '../model/types/createProfileTypes';

export const createProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createProfile: build.mutation<void, CreateProfileRequestData>({
			query: (params) => ({
				url: createProfileApiUrls.createProfile,
				method: 'POST',
				body: params,
			}),
			async onQueryStarted(_, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					const typed = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_PROFILE_CREATE_SUCCESS));
					typed.navigate(ROUTES.interview.page);

					dispatch(baseApi.util.invalidateTags([ApiTags.PROFILE]));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_PROFILE_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useCreateProfileMutation } = createProfileApi;
