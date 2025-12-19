import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { challengeApiUrls } from '../model/constants/challenge';
import {
	GetChallengeByIdResponse,
	GetChallengesListParams,
	GetChallengesListResponse,
} from '../model/types/challenge';

const challengeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getChallengesList: build.query<GetChallengesListResponse, GetChallengesListParams>({
			query: (params) => ({
				url: challengeApiUrls.getChallengesList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.CHALLENGES],
		}),
		getChallengeById: build.query<GetChallengeByIdResponse, string>({
			query: (id) => ({
				url: route(challengeApiUrls.getChallengeById, id),
			}),
			providesTags: [ApiTags.CHALLENGE_DETAIL],
		}),
	}),
});

export const { useGetChallengesListQuery, useGetChallengeByIdQuery } = challengeApi;
