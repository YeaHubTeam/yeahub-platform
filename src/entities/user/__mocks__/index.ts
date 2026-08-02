import { usersListMock } from './userListMock';
import { userProfilePositionMock } from './userProfilePositionMock';
import { userRolesListMock } from './userRolesListMock';
import { usersRatingMock } from './usersRatingMock';
import { usersRatingStatsMock } from './usersRatingStatsMock';

export const usersRatingHandlers = [usersRatingMock, userProfilePositionMock, usersRatingStatsMock];

export const userHandlers = [usersListMock, userRolesListMock];
export { userRolesMock } from './data/userRolesMock';

export {
	adminUser,
	authorUser,
	userFreeUser,
	userPremiumUser,
	userUnverifiedUser,
} from './data/usersDataMock';
export { authorAuthor, adminAuthor } from './data/userAuthorsMock';
