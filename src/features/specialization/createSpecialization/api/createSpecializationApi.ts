import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Specialization, SpecializationFormValues } from '@/entities/specialization';

export const createSpecializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createSpecialization: build.mutation<Specialization, SpecializationFormValues>({
			query: (specialization) => ({
				url: `/specializations`,
				method: 'POST',
				body: specialization,
			}),
			invalidatesTags: [ApiTags.SPECIALIZATIONS],
		}),
	}),
});

export const { useCreateSpecializationMutation } = createSpecializationApi;
