import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { deleteSpecializationsApiUrls } from '../model/constants/deleteSpecializationsConstants';

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
