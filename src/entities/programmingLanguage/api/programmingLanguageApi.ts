import { ApiTags, baseApi } from '@/shared/config';

import { programmingLanguagesApiUrls } from '../model/constants/programmingLanguageApiUrls';
import type { GetLanguagesResponse } from '../model/types/programmingLanguage';

const languageApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getLanguages: build.query<GetLanguagesResponse, void>({
			query: () => ({
				url: programmingLanguagesApiUrls.getProgrammingLanguagesList,
			}),
			providesTags: [ApiTags.PROGRAMMING_LANGUAGE],
		}),
	}),
});

export const { useGetLanguagesQuery } = languageApi;
