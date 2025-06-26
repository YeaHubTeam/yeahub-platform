import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { toast } from '@/shared/ui/Toast';

import { authApi } from '@/entities/auth';
import { profileActions } from '@/entities/profile';

import { CreateProfileRequestData, ProfileRequestData } from '../model/types/manageProfilesTypes';

export const manageProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		setActiveProfile: build.mutation<void, ProfileRequestData>({
			query: ({ id }) => ({
				url: `/profiles/${id}/active`,
				method: 'PATCH',
			}),
			async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
				dispatch(profileActions.setActiveProfile(id));

				const patchResult = dispatch(
					authApi.util.updateQueryData('profile', undefined, (draft) => {
						draft.profiles.forEach((profile) => {
							profile.isActive = false;
						});
						const targetProfile = draft.profiles.find((p) => p.id === id);
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
		}),
		createProfile: build.mutation<void, CreateProfileRequestData>({
			query: (params) => ({
				url: '/profiles',
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
		deleteProfile: build.mutation<void, ProfileRequestData>({
			query: ({ id }) => ({
				url: `/profiles/${id}`,
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

export const { useSetActiveProfileMutation, useCreateProfileMutation, useDeleteProfileMutation } =
	manageProfileApi;
