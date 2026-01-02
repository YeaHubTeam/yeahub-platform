import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { authApi } from '@/entities/auth';
import { profileActions } from '@/entities/profile';

import { setActiveProfileApiUrls } from '../lib/constants/setActiveProfileConstants';

export const setActiveProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		setActiveProfile: build.mutation<void, string>({
			query: (profileId) => ({
				url: route(setActiveProfileApiUrls.setActiveProfile, profileId),
				method: 'PATCH',
			}),
			async onQueryStarted(profileId, { queryFulfilled, dispatch }) {
				dispatch(profileActions.setActiveProfile(profileId));

				const patchResult = dispatch(
					authApi.util.updateQueryData('profile', undefined, (draft) => {
						draft.profiles.forEach((profile) => {
							profile.isActive = false;
						});
						const targetProfile = draft.profiles.find((p) => p.id === profileId);
						if (targetProfile) {
							targetProfile.isActive = true;
						}
					}),
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();

					toast.error(i18n.t(Translation.TOAST_PROFILE_SET_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.PROFILE],
		}),
	}),
});

export const { useSetActiveProfileMutation } = setActiveProfileApi;
