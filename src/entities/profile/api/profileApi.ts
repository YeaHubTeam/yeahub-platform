import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Profile } from '../model/types/profile';

const profileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getProfileById: build.query<Profile, string>({
			query: (profileId) => ({
				url: `/profiles/${profileId}`,
			}),
			providesTags: [ApiTags.PROFILE],
		}),
	}),
});

export const { useGetProfileByIdQuery } = profileApi;
