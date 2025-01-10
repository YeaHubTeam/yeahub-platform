import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { roleApiUrls } from '../model/constants/roleConstants';
import { GetUserRolesResponse } from '../model/types/role';

const userRoleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getRolesList: build.query<GetUserRolesResponse, void>({
			query: () => ({
				url: roleApiUrls.getRolesList,
			}),
			providesTags: [ApiTags.ROLES],
		}),
	}),
});

export const { useGetRolesListQuery } = userRoleApi;
