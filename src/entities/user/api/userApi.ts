import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { toast } from '@/shared/ui/Toast';

import type { UserInfoProfile, ExtraArgument } from '../model/types/userInfo';

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<void, UserInfoProfile & { id: string }>({
			query: ({ id, ...userInfo }) => ({
				url: `profiles/${id}`,
				body: userInfo,
				method: 'PUT',
				providesTags: [ApiTags.PROFILE_DETAIL],
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
			invalidatesTags: (_result, _error, { id }) => [{ type: ApiTags.PROFILE_DETAIL, id }],
		}),
	}),
});

export const { useUpdateProfileMutation } = userApi;
