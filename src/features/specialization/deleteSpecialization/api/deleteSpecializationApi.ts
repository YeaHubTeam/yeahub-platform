import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Specialization } from '@/entities/specialization';

const deleteSpecializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSpecialization: build.mutation<Specialization, Specialization['id']>({
			query: (specializationId) => ({
				url: `/specializations/${specializationId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.SPECIALIZATIONS, ApiTags.SPECIALIZATION_DETAIL],
		}),
	}),
});

export const { useDeleteSpecializationMutation } = deleteSpecializationApi;
