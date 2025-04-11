import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { toast } from '@/shared/ui/Toast';

import {
	EditAvatarRequestData,
	EditProfileRequestData,
	EditUserRequestData,
} from '../model/types/editProfileTypes';

export const editProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<void, EditProfileRequestData>({
			query: ({ id, ...profileInfo }) => ({
				url: `profiles/${id}`,
				body: profileInfo,
				method: 'PUT',
			}),
			async onQueryStarted({ ...profileInfo }, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					await dispatch(
						editProfileApi.endpoints.updateUser.initiate({
							id: profileInfo.user.id,
							userInfo: {
								username: profileInfo.user.username,
								country: profileInfo.user.country,
								city: profileInfo.user.city,
								birthday: profileInfo.user.birthday,
								address: profileInfo.user.address,
								avatarUrl: profileInfo.user.avatarUrl,
								avatarImage: profileInfo.user.avatarImage,
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
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					toast.success(i18n.t(Translation.TOAST_PROFILE_UPDATE_SUCCESS));
					typedExtra.navigate(ROUTES.profile.page);
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
