import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { hhApiUrls } from '@/entities/hh/model/constants/hhConstants';
import { GetHhAnalyticsItemResponse } from '@/entities/hh/model/types/hh';

const hh = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getHhTopBySpec: build.query<GetHhAnalyticsItemResponse, number>({
			query: (specId) => ({
				url: route(hhApiUrls.getHhTopBySpec, specId),
			}),
		}),
	}),
});

export const { useGetHhTopBySpecQuery } = hh;
