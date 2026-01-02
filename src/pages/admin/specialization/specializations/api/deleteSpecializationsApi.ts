import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { deleteSpecializationsApiUrls } from '../lib/constants/deleteSpecializationsConstants';

export const deleteSpecializationsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSpecializationOfMultiply: build.mutation<void, number>({
			query: (specializationId) => ({
				url: route(deleteSpecializationsApiUrls.deleteSpecialization, specializationId),
				method: 'DELETE',
			}),
		}),
	}),
});
