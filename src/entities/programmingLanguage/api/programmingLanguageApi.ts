import { ApiTags, baseApi } from '@/shared/config';

import type { GetLanguagesResponse } from '@/entities/programmingLanguage/model/types/programmingLanguage';

const languageApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getLanguages: build.query<GetLanguagesResponse, void>({
			query: () => ({
				url: '/api/v1/live-coding/languages',
			}),
			providesTags: [ApiTags.PROGRAMMING_LANGUAGE],
		}),
	}),
});

export const { useGetLanguagesQuery } = languageApi;
