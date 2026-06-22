import { usersListMock } from './userListMock';
import { userProfilePositionMock } from './userProfilePositionMock';
import { usersRatingBySpecializationMock } from './usersRatingBySpecializationMock';
import { usersRatingMock } from './usersRatingMock';
import { usersRatingStatsMock } from './usersRatingStatsMock';

export const usersRatingHandlers = [
	usersRatingBySpecializationMock,
	usersRatingMock,
	userProfilePositionMock,
	usersRatingStatsMock,
];

export const userHandlers = [usersListMock];
export { userRolesMock } from './data/userRolesMock';
export { usersMock } from './data/usersMock';
