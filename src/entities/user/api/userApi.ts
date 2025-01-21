import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { userApiUrls } from '../model/constants/userConstants';
import {
	GetUserByIdResponse,
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
		getUserById: build.query<GetUserByIdResponse, string>({
			query: (userId) => ({
				url: route(userApiUrls.getsById, userId),
			}),
			providesTags: [ApiTags.USER_DETAIL],
		}),
	}),
});

export const { useGetUsersListQuery, useGetUserByIdQuery } = userApi;
		getUserRolesList: build.query<GetUserRolesListResponse, void>({
			query: () => ({
				url: userApiUrls.getUserRolesList,
			}),
			providesTags: [ApiTags.ROLES],
		}),
	}),
});

export const { useGetUsersListQuery, useGetUserRolesListQuery } = userApi;