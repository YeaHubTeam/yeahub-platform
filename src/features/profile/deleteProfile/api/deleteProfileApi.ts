import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { deleteProfileApiUrls } from '@/features/profile/deleteProfile/model/constants/deleteProfileContants';

export const deleteProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteProfile: build.mutation<void, string>({
			query: (profileId) => ({
				url: route(deleteProfileApiUrls.deleteProfile, profileId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_PROFILE_DELETE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_PROFILE_DELETE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.PROFILE],
		}),
	}),
});

export const { useDeleteProfileMutation } = deleteProfileApi;
