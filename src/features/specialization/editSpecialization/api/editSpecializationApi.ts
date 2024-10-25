import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Specialization } from '@/entities/specialization';

const editSpecializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editSpecialization: build.mutation<Specialization, Specialization>({
			query: (specialization) => ({
				url: `/specializations/${specialization.id}`,
				method: 'PATCH',
				body: specialization,
			}),
			invalidatesTags: [ApiTags.SPECIALIZATIONS, ApiTags.SPECIALIZATION_DETAIL],
		}),
	}),
});

export const { useEditSpecializationMutation } = editSpecializationApi;
