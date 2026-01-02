import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { hhApiUrls } from '../lib/constants/hhConstants';
import { GetHhAnalyticsItemResponse } from '../model/types/hh';

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
