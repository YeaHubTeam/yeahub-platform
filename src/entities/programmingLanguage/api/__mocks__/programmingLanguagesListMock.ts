import { DefaultBodyType, http, HttpResponse } from 'msw';

import { programmingLanguagesApiUrls } from '../../model/constants/programmingLanguageApiUrls';
import { GetLanguagesResponse } from '../../model/types/programmingLanguage';

import { programmingLanguagesMock } from './data/programmingLanguagesMock';

export const programmingLanguagesListMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetLanguagesResponse
>(process.env.API_URL + programmingLanguagesApiUrls.getProgrammingLanguagesList, () => {
	return HttpResponse.json(programmingLanguagesMock);
});
