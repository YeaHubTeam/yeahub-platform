import { authMockProfilesByAccessToken, Profile } from '@/entities/auth/@x/question';

import { questionsMock } from './questionsMock';

const getUserProfilesQuestionProgress = (profiles: Profile[]) => {
	return profiles.map((profile) => [
		profile.id,
		Object.fromEntries(
			questionsMock.data.map(({ id }) => [id, { isLearned: false, checksCount: 0 }]),
		),
	]);
};

export const userQuestionProgressMock = Object.fromEntries(
	getUserProfilesQuestionProgress(
		Object.values(authMockProfilesByAccessToken)
			.filter((user) =>
				user.userRoles.some((role) => role.name === 'admin' || role.name === 'candidate-premium'),
			)
			.flatMap((user) => user.profiles),
	),
);
