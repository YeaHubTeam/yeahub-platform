import { http, HttpResponse, type DefaultBodyType } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';

import { setActiveProfileApiUrls } from '../../model/constants/setActiveProfileConstants';

export const setActiveProfileMock = http.patch<
	{ profileId: string },
	DefaultBodyType,
	{ message: string } | null
>(`${process.env.API_URL}${setActiveProfileApiUrls.setActiveProfile}`, ({ params, request }) => {
	const profileMockResponse = getMockAuthProfile(request);

	if (!profileMockResponse) {
		return new HttpResponse(null, { status: 401 });
	}

	const targetProfile = profileMockResponse.profiles.find(
		(profile) => profile.id === params.profileId,
	);

	if (!targetProfile) {
		return HttpResponse.json({ message: 'Profile not found' }, { status: 404 });
	}

	profileMockResponse.profiles.forEach((profile) => {
		profile.isActive = profile.id === params.profileId;
	});

	profileMockResponse.activeProfile = targetProfile;

	return new HttpResponse(null, { status: 204 });
});
