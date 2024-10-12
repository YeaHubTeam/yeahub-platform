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
			query: ({ userId, ...profileInfo }) => ({
				url: `profiles/${userId}`,
				body: profileInfo,
				method: 'PUT',
			}),
			async onQueryStarted({ ...profileInfo }, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					await dispatch(
						editProfileApi.endpoints.updateUser.initiate({
							id: profileInfo.id,
							userInfo: {
								firstName: profileInfo.firstName,
								lastName: profileInfo.lastName,
								country: profileInfo.country,
								phone: profileInfo.phone,
								city: profileInfo.city,
								birthday: profileInfo.birthday,
								address: profileInfo.address,
								avatarUrl: profileInfo.avatarUrl,
								avatarImage: profileInfo.avatarImage,
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
			invalidatesTags: [ApiTags.PROFILE_DETAIL, ApiTags.PROFILE],
		}),
	}),
});

export const { useUpdateProfileMutation } = editProfileApi;
