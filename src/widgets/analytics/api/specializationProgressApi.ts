import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { specializationProgressApiUrls } from '../model/constants/specializationProgress';
import {
	GetSpecializationProgressParamsRequest,
	GetSpecializationProgressResponse,
} from '../model/types/specializationProgress';

const specializationProgressApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getGeneralProgress: build.query<
			GetSpecializationProgressResponse,
			GetSpecializationProgressParamsRequest
		>({
			query: (params) => ({
				url: specializationProgressApiUrls.getGeneralProgress,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.GENERAL_PROGRESS],
		}),
	}),
});

export const { useGetGeneralProgressQuery } = specializationProgressApi;
