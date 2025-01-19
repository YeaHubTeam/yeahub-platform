import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { userApiUrls } from '../model/constants/userConstants';
import {
	GetUserRolesListResponse,
	GetUsersListParamsRequest,
	GetUsersListResponse,
} from '../model/types/user';

const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsersList: build.query<GetUsersListResponse, GetUsersListParamsRequest>({
			query: (params) => ({
				url: userApiUrls.getUsersList,
				params,
			}),
			providesTags: [ApiTags.USERS],
		}),
		getUserRolesList: build.query<GetUserRolesListResponse, void>({
			query: () => ({
				url: userApiUrls.getUserRolesList,
			}),
			providesTags: [ApiTags.ROLES],
		}),
	}),
});

export const { useGetUsersListQuery, useGetUserRolesListQuery } = userApi;
