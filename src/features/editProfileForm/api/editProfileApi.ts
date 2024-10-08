import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { toast } from '@/shared/ui/Toast';

import { EditProfileRequestData, ExtraArgument } from '../model/types/editProfileTypes';

export const editProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<void, EditProfileRequestData>({
			query: ({ id, ...userInfo }) => ({
				url: `profiles/${id}`,
				body: userInfo,
				method: 'PUT',
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
