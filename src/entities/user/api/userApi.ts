import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { userApiUrls } from '../model/constants/userConstants';
import {
	GetUserByIdResponse,
	GetUserProfileByIdResponse,
	GetUserRolesListResponse,
	GetUsersListParamsRequest,
	GetUsersListResponse,
	UserRolesMutationRequest,
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
				url: route(userApiUrls.getUserById, userId),
			}),
			providesTags: [ApiTags.USER_DETAIL],
		}),
		getUserProfileById: build.query<GetUserProfileByIdResponse, string>({
			query: (userId) => ({
				url: route(userApiUrls.getRelatedUserById, userId),
			}),
			providesTags: [ApiTags.USER_DETAIL],
			transformResponse(response: GetUserProfileByIdResponse) {
				const activeProfile =
					response.profiles.find((profile) => profile.isActive) ?? response.profiles[0];

				return { ...response, activeProfile };
			},
		}),
		getUserRolesList: build.query<GetUserRolesListResponse, void>({
			query: () => ({
				url: userApiUrls.getUserRolesList,
			}),
			providesTags: [ApiTags.ROLES],
		}),
		addUserRoles: build.mutation<void, UserRolesMutationRequest>({
			query: ({ userId, roles }) => ({
				url: route(userApiUrls.addUserRoles, userId),
				method: 'POST',
				body: { roles },
			}),
			invalidatesTags: [ApiTags.USER_DETAIL, ApiTags.USERS],
		}),
		removeUserRoles: build.mutation<void, UserRolesMutationRequest>({
			query: ({ userId, roles }) => ({
				url: route(userApiUrls.removeUserRoles, userId),
				method: 'DELETE',
				body: { roles },
			}),
			invalidatesTags: [ApiTags.USER_DETAIL, ApiTags.USERS],
		}),
	}),
});

export const {
	useGetUsersListQuery,
	useGetUserByIdQuery,
	useGetUserProfileByIdQuery,
	useGetUserRolesListQuery,
	useAddUserRolesMutation,
	useRemoveUserRolesMutation,
} = userApi;
