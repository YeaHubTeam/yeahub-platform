import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { toast } from '@/shared/ui/Toast';

import {
	EditProfileRequestData,
	EditUserRequestData,
	ExtraArgument,
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
								firstName: profileInfo.user.firstName,
								lastName: profileInfo.user.lastName,
								country: profileInfo.user.country,
								phone: profileInfo.user.phone,
								city: profileInfo.user.city,
								birthday: profileInfo.user.birthday,
								address: profileInfo.user.address,
								avatarUrl: profileInfo.user.avatarUrl,
								avatarImage: profileInfo.user.avatarImage,
							},
						}),
					);
				} catch (err) {
					toast.error('Профиль не удалось изменить');
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

					toast.success('Профиль был успешно изменен');
					typedExtra.navigate('/profile');
				} catch (err) {
					toast.error('Профиль не удалось изменить');
					// eslint-disable-next-line no-console
					console.log(err);
				}
			},
			invalidatesTags: [ApiTags.PROFILE_DETAIL],
		}),
	}),
});

export const { useUpdateProfileMutation } = editProfileApi;
