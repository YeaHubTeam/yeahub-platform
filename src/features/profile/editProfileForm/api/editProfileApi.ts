import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { toast } from '@/shared/ui/Toast';

import {
	EditAvatarRequestData,
	EditProfileRequestData,
	EditUserRequestData,
} from '../model/types/editProfileTypes';

export const editProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<void, EditProfileRequestData>({
			query: ({ id, ...profile }) => ({
				url: `profiles/${id}`,
				body: profile,
				method: 'PUT',
			}),
			async onQueryStarted({ ...profile }, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					await dispatch(
						editProfileApi.endpoints.updateUser.initiate({
							id: profile.user.id,
							userInfo: {
								username: profile.user.username,
								country: profile.user.country,
								city: profile.user.city,
								birthday: profile.user.birthday,
								address: profile.user.address,
								avatarUrl: profile.user.avatarUrl,
								avatarImage: profile.user.avatarImage,
							},
						}),
					);
				} catch (err) {
					toast.error(i18n.t(Translation.TOAST_PROFILE_UPDATE_FAILED));
					// eslint-disable-next-line no-console
					console.log(err);
				}
			},
			invalidatesTags: [ApiTags.PROFILE_DETAIL],
		}),
		updateUser: build.mutation<void, EditUserRequestData>({
			query: ({ id, userInfo }) => ({
				url: `/users/${id}`,
				body: { ...userInfo },
				method: 'PATCH',
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;

					toast.success(i18n.t(Translation.TOAST_PROFILE_UPDATE_SUCCESS));
				} catch (err) {
					toast.error(i18n.t(Translation.TOAST_PROFILE_UPDATE_FAILED));
					// eslint-disable-next-line no-console
					console.log(err);
				}
			},
			invalidatesTags: [ApiTags.PROFILE_DETAIL, ApiTags.PROFILE],
		}),
		updateAvatar: build.mutation<void, EditAvatarRequestData>({
			query: ({ id, image }) => {
				const body = image ? { avatarImage: image } : { avatarUrl: '' };
				return {
					url: `/users/${id}`,
					body,
					method: 'PATCH',
				};
			},
			async onQueryStarted({ image, oldImage }, { queryFulfilled }) {
				try {
					await queryFulfilled;
					if (oldImage) {
						image
							? toast.success(i18n.t(Translation.TOAST_AVATAR_UPDATE_SUCCESS))
							: toast.success(i18n.t(Translation.TOAST_AVATAR_DELETE_SUCCESS));
					} else {
						toast.success(i18n.t(Translation.TOAST_AVATAR_CREATE_SUCCESS));
					}
				} catch (err) {
					if (oldImage) {
						image
							? toast.error(i18n.t(Translation.TOAST_AVATAR_UPDATE_FAILED))
							: toast.error(i18n.t(Translation.TOAST_AVATAR_DELETE_FAILED));
					} else {
						toast.error(i18n.t(Translation.TOAST_AVATAR_CREATE_FAILED));
					}
					// eslint-disable-next-line no-console
					console.log(err);
				}
			},
			invalidatesTags: [ApiTags.PROFILE_DETAIL, ApiTags.PROFILE],
		}),
	}),
});

export const { useUpdateProfileMutation, useUpdateAvatarMutation } = editProfileApi;
