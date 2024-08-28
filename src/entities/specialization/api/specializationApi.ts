import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { SpecializationsListParams, Specialization } from '../model/types/specialization';

const specializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSpecializationsList: build.query<Response<Specialization[]>, SpecializationsListParams>({
			query: (params) => ({
				url: '/specializations',
				params,
			}),
			providesTags: [ApiTags.SPECIALIZATIONS],
		}),
		getSpecializationById: build.query<Specialization, string>({
			query: (specializationId) => ({
				url: `/specializations/${specializationId}`,
			}),
			providesTags: [ApiTags.SPECIALIZATION_DETAIL],
		}),
	}),
});

export const { useGetSpecializationByIdQuery, useGetSpecializationsListQuery } = specializationApi;
