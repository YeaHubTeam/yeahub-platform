import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteProfileApiUrls } from '../model/constants/deleteProfileContants';

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
