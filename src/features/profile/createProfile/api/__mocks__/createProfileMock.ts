import { DefaultBodyType, http, HttpResponse, PathParams } from 'msw';

import { Profile, getMockAuthProfile } from '@/entities/auth';

import { createProfileApiUrls } from '../../model/constants/createProfileConstants';
import { CreateProfileRequestData } from '../../model/types/createProfileTypes';

export const createProfileMock = http.post<PathParams, CreateProfileRequestData, DefaultBodyType>(
	`${process.env.API_URL}${createProfileApiUrls.createProfile}`,
	async ({ request }) => {
		const profileMockResponse = getMockAuthProfile(request);

		if (!profileMockResponse) {
			return HttpResponse.json(
				{
					message: 'auth.auth.unauthorized',
					statusCode: 401,
					description: 'Authentication failed',
				},
				{ status: 401 },
			);
		}

		const body = await request.json();

		const newProfile: Profile = {
			id: crypto.randomUUID(),
			profileType: body.profileType,
			specializationId: body.specializationId,
			markingWeight: body.markingWeight,
			description: '',
			links: [],
			socialNetwork: [],
			image_src: '',
			profileSkills: [],
			isActive: true,
		};

		profileMockResponse.profiles.forEach((profile) => {
			profile.isActive = false;
		});

		profileMockResponse.profiles.push(newProfile);
		profileMockResponse.activeProfile = newProfile;

		return new HttpResponse(null, { status: 201 });
	},
);
