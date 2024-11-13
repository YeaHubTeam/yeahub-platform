import { baseApi } from '@/shared/config/api/baseApi';

import { Specialization } from '@/entities/specialization';

export const deleteSpecializationsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSpecializationWithoutErrorHandler: build.mutation<Specialization, Specialization['id']>({
			query: (specializationId) => ({
				url: `/specializations/${specializationId}`,
				method: 'DELETE',
			}),
		}),
	}),
});
