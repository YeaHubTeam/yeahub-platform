import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { specializationApiUrls } from '../model/constants/specializationConstants';
import {
	GetSpecializationByIdResponse,
	GetSpecializationsListParamsRequest,
	GetSpecializationsListResponse,
} from '../model/types/specialization';

const specializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSpecializationsList: build.query<
			GetSpecializationsListResponse,
			GetSpecializationsListParamsRequest
		>({
			query: (params) => ({
				url: specializationApiUrls.getSpecializationsList,
				params,
			}),
			providesTags: [ApiTags.SPECIALIZATIONS],
		}),
		getSpecializationById: build.query<GetSpecializationByIdResponse, string>({
			query: (specializationId) => ({
				url: route(specializationApiUrls.getsById, specializationId),
			}),
			providesTags: [ApiTags.SPECIALIZATION_DETAIL],
		}),
	}),
});

export const { useGetSpecializationByIdQuery, useGetSpecializationsListQuery } = specializationApi;
