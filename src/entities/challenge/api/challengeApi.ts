import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { challengeApiUrls } from '../model/constants/challenge';
import {
	ExecuteCodeRequest,
	ExecuteCodeResponse,
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
		executeCode: build.mutation<ExecuteCodeResponse, ExecuteCodeRequest>({
			query: (body) => ({
				url: challengeApiUrls.executeCode,
				method: 'POST',
				body,
			}),
		}),
		testCode: build.mutation<ExecuteCodeResponse, ExecuteCodeRequest>({
			query: (body) => ({
				url: challengeApiUrls.testCode,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useGetChallengesListQuery,
	useGetChallengeByIdQuery,
	useExecuteCodeMutation,
	useTestCodeMutation,
} = challengeApi;
