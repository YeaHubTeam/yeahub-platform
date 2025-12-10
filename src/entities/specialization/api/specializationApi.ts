import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { specializationApiUrls } from '../model/constants/specializationConstants';
import { specializationsProgressApiUrls } from '../model/constants/specializationsProgress';
import {
	GetSpecializationByIdResponse,
	GetSpecializationsListParamsRequest,
	GetSpecializationsListResponse,
} from '../model/types/specialization';
import {
	GetSpecializationsProgressParamsRequest,
	GetSpecializationsProgressResponse,
} from '../model/types/specializationsProgress';

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
		getSpecializationsGeneralProgress: build.query<
			GetSpecializationsProgressResponse,
			GetSpecializationsProgressParamsRequest
		>({
			query: (params) => ({
				url: specializationsProgressApiUrls.getSpecializationsGeneralProgress,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.SPECIALIZATIONS_GENERAL_PROGRESS],
		}),
	}),
});

export const {
	useGetSpecializationByIdQuery,
	useGetSpecializationsListQuery,
	useGetSpecializationsGeneralProgressQuery,
} = specializationApi;
